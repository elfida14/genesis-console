require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const walletManager = require('./walletManager');
const paymentEngine = require('./paymentEngine');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

function isAuthorized(req) {
  return req.headers['x-user'] === process.env.GENESIS_USER;
}

app.post('/command', async (req, res) => {
  const { command, data } = req.body;

  if (!isAuthorized(req)) {
    return res.status(401).json({ success: false, error: 'Accesso negato.' });
  }

  try {
    let result;

    switch (command.toLowerCase()) {
      case 'status':
        const balance = await walletManager.getBalance();
        result = { status: 'online', balance: `${balance} BTC` };
        break;

      case 'sendbtc':
        if (!data || !data.to || !data.amount) {
          throw new Error('Dati di invio incompleti.');
        }
        const tx = await walletManager.sendBTC(data.to, data.amount);
        result = { success: true, txid: tx };
        break;

      case 'ping':
        result = { pong: true };
        break;

      case 'sendmail':
        await sendMail(data);
        result = { success: true, message: 'Email inviata con successo.' };
        break;

      case 'revolut':
        if (!data || !data.amount) {
          throw new Error('Dati incompleti per Revolut.');
        }
        const note = data.note || "—";
        await paymentEngine.sendNotification(data.amount, note);
        result = { success: true, message: 'Notifica inviata per bonifico.' };
        break;

      default:
        throw new Error(`Comando sconosciuto: ${command}`);
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error('Errore comando:', command, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

function sendMail(data) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Genesis Notifier" <${process.env.EMAIL_USER}>`,
      to: data.to,
      subject: data.subject || 'Messaggio da Genesis',
      text: data.body || 'Contenuto non specificato.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      else resolve(info);
    });
  });
}

app.listen(PORT, () => {
  console.log(`🌐 Genesis Console attiva sulla porta ${PORT}`);
});
