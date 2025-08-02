const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '8171556916:AAECpQMwwEF9c_TCKaL9yI0Tt1F71T5KR-A', { polling: false });
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7817224380';

const logFile = path.join(__dirname, 'logs', 'tlgs.log');

function sendTelegramMessage(message) {
  const fullMsg = `[GENESIS 🔔]\n${message}`;
  bot.sendMessage(CHAT_ID, fullMsg)
    .then(() => {
      fs.appendFileSync(logFile, `[TELEGRAM SENT] ${new Date().toISOString()} - ${message}\n`);
    })
    .catch(err => {
      fs.appendFileSync(logFile, `[TELEGRAM ERROR] ${new Date().toISOString()} - ${err.message}\n`);
      console.error("❌ Errore invio Telegram:", err);
    });
}

module.exports = {
  sendTelegramMessage
};
