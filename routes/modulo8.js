// 📁 routes/modulo8.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// 📄 Log file
const logPath = path.join(__dirname, '..', 'logs', 'tlgs.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

router.post('/', (req, res) => {
  const utente = req.headers['x-user'] || 'sconosciuto';
  const visione = req.body.visione || 'nessuna visione ricevuta';

  const messaggio = `👁️ Modulo 8 attivato da ${utente} → Visione: ${visione}`;
  console.log(messaggio);
  logStream.write(`[MODULO8] ${new Date().toISOString()} - ${messaggio}\n`);

  res.json({
    modulo: 8,
    stato: '🧿 Visione ricevuta',
    interpretazione: '🌀 In fase di elaborazione simbolica.',
    visioneRicevuta: visione
  });
});

module.exports = router;
