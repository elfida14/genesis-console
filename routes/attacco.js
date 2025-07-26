// routes/attacco.js
const express = require('express');
const router = express.Router();

// Memoria temporanea simulata
let attacchiLog = [];

// Endpoint: Esegui attacco simulato
router.post('/esegui', (req, res) => {
  const { obiettivo, tipo, intensità } = req.body;

  if (!obiettivo || !tipo) {
    return res.status(400).json({ errore: 'Dati insufficienti' });
  }

  const timestamp = new Date().toISOString();
  const attacco = { obiettivo, tipo, intensità, timestamp };
  attacchiLog.push(attacco);

  console.log(`[⚔️ ATTACCO] Target: ${obiettivo} | Tipo: ${tipo} | Intensità: ${intensità}`);
  res.json({ esito: 'Attacco simulato avviato', dettagli: attacco });
});

// Endpoint: Log degli attacchi
router.get('/log', (req, res) => {
  res.json(attacchiLog);
});

// Endpoint: Reset log
router.delete('/reset', (req, res) => {
  attacchiLog = [];
  res.json({ esito: 'Log attacchi cancellato' });
});

module.exports = router;
