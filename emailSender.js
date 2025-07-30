// emailSender.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "icloud",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function send(subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { send };
