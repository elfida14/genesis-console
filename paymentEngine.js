const TelegramBot = require('node-telegram-bot-api');
const nodemailer = require('nodemailer');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const chatId = process.env.TELEGRAM_CHAT_ID;

module.exports.sendNotification = async (amount, note) => {
  const message = `📲 Invio richiesto: €${amount}\n📝 Nota: ${note}`;
  await bot.sendMessage(chatId, message);
  // Email invio opzionale:
  await sendEmailNotification(amount, note);
};

function sendEmailNotification(amount, note) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Genesis" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Notifica invio €${amount}`,
      text: `Nota: ${note}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return reject(err);
      resolve(info);
    });
  });
}
