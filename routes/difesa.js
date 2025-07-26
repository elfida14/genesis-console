// routes/difesa.js
const express = require('express');
const router = express.Router();

let difeseLog = [];
let minacceRilevate = [];

// Endpoint: Attiva difesa
router.post('/attiva', (req, res) => {
  const { tipo, intensità, sorgente } = req.body;

  if (!tipo || !sorgente) {
    return res.status(400).json({ errore: 'Dati difesa insufficienti' });
  }

  const timestamp = new Date().toISOString();
  const difesa = { tipo, intensità, sorgente, timestamp };
  difeseLog.push(difesa);

  console.log(`[🛡️ DIFESA] Tipo: ${tipo} | Sorgente: ${sorgente} | Intensità: ${intensità}`);
  res.json({ esito: 'Difesa attivata', dettagli: difesa });
});

// Endpoint: Rileva minaccia
router.post('/rileva', (req, res) => {
  const { tipo, livello, provenienza } = req.body;

  if (!tipo || !provenienza) {
    return res.status(400).json({ errore: 'Dati minaccia mancanti' });
  }

  const rilevata = {
    tipo,
    livello,
    provenienza,
    stato: 'in osservazione',
    timestamp: new Date().toISOString()
  };

  minacceRilevate.push(rilevata);
  console.log(`[⚠️ MINACCIA] Tipo: ${tipo} | Livello: ${livello} | Da: ${provenienza}`);
  res.json({ esito: 'Minaccia registrata', dettagli: rilevata });
});

// Endpoint: Visualizza minacce
router.get('/minacce', (req, res) => {
  res.json(minacceRilevate);
});

// Endpoint: Log difesa
router.get('/log', (req, res) => {
  res.json(difeseLog);
});

module.exports = router;
