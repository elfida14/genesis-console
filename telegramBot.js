// telegramBot.js
const axios = require("axios");

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function send(msg) {
  if (!TOKEN || !CHAT_ID) throw new Error("Token o Chat ID Telegram mancanti.");
  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: msg
  });
}

module.exports = { send };
