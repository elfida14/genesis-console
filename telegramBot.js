// telegramBot.js
const https = require('https');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  const data = JSON.stringify({ chat_id: CHAT_ID, text });

  const req = https.request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  });

  req.on('error', (e) => {
    console.error('❌ Telegram error:', e);
  });

  req.write(data);
  req.end();
}

module.exports = { sendTelegramMessage };
