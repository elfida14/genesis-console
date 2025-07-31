// routes/paymentEngine.js
const express = require('express');
const router = express.Router();
const { sendTelegramMessage } = require('../telegramBot');
const { sendEmail } = require('../emailSender');

const IBAN_REALE = 'IT02N0366901600497371068106';
const BENEFICIARIO = 'Baki Cabadak';
const SWIFT = 'REVOITM2';

router.post('/', async (req, res) => {
  const { amount, message } = req.body;

  const report = `💸 RICHIESTA DI INVIO EURO:
--------------------------
👤 Beneficiario: ${BENEFICIARIO}
🏦 IBAN: ${IBAN_REALE}
🏦 BIC/SWIFT: ${SWIFT}
💶 Importo: €${amount}
📝 Messaggio: ${message}
📅 Data: ${new Date().toLocaleString()}
`;

  try {
    await sendTelegramMessage(report);
    await sendEmail('baki.ozturk.2000@icloud.com', 'Genesis – Invio Fondi', report);

    console.log('✅ Invio simulato eseguito con successo:', report);
    res.json({ status: 'ok', iban: IBAN_REALE, amount });
  } catch (err) {
    console.error('❌ Errore durante invio:', err);
    res.status(500).json({ status: 'error', error: err });
  }
});

module.exports = router;
