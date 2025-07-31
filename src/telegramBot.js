// telegramBot.js
const https = require('https');

const TELEGRAM_TOKEN = '8171556916:AAECpQMwwEF9c_TCKaL9yI0Tt1F71T5KR-A';
const CHAT_ID = '7817224380';

function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const payload = JSON.stringify({
    chat_id: CHAT_ID,
    text: message
  });

  const req = https.request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, res => {
    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error('Telegram error:', error);
  });

  req.write(payload);
  req.end();
}

module.exports = { sendTelegramMessage };
