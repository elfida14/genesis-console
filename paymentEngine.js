// paymentEngine.js
const axios = require("axios");
const nodemailer = require("nodemailer");

const telegramToken = "8171556916:AAECpQMwwEF9c_TCKaL9yI0Tt1F71T5KR-A";
const telegramChatId = "7817224380";
const emailTo = "baki.ozturk.2000@icloud.com";

const revolutInfo = {
  beneficiary: "Baki Cabadak",
  iban: "IT02N0366901600497371068106",
  bic: "REVOITM2",
  bank: "Revolut Bank UAB",
  bankAddress: "Via Dante 7, 20123, Milano (MI), Italy",
};

async function sendNotification(amount, note) {
  const msg = `
💸 *GENESIS - INVIO MANUALE RICHIESTO*
Importo: *€${amount}*
Beneficiario: ${revolutInfo.beneficiary}
IBAN: \`${revolutInfo.iban}\`
BIC: \`${revolutInfo.bic}\`
Nota: ${note || "—"}

✅ Procedi manualmente tramite bonifico o Revolut link.
`;

  // ✉️ Email
  await sendEmail(`Invio richiesto: €${amount}`, msg.replace(/\*/g, ""));

  // 📬 Telegram
  await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    chat_id: telegramChatId,
    text: msg,
    parse_mode: "Markdown"
  });

  return "Notifiche inviate.";
}

async function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // es: genesis.console@gmail.com
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  await transporter.sendMail({
    from: `"Genesis" <${process.env.EMAIL_USER}>`,
    to: emailTo,
    subject,
    text,
  });
}

module.exports = { sendNotification };
