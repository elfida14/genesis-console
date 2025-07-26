// 📁 routes/modulo7.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// 📄 Log nel file centrale
const logPath = path.join(__dirname, '..', 'logs', 'tlgs.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

router.post('/', (req, res) => {
  const utente = req.headers['x-user'] || 'sconosciuto';
  const payload = req.body || {};

  const messaggio = `🧠 Modulo 7 attivato da ${utente} → payload: ${JSON.stringify(payload)}`;
  console.log(messaggio);
  logStream.write(`[MODULO7] ${new Date().toISOString()} - ${messaggio}\n`);

  res.json({
    stato: '🧬 OK',
    modulo: 7,
    risposte: [
      'Modulo 7 attivato con successo.',
      'Pronto a ricevere comandi di livello superiore.',
      '📡 Connessione stabile.'
    ],
    ricevuto: payload
  });
});

module.exports = router;
