// routes/shadow.js
const express = require('express');
const router = express.Router();

let logShadow = [];
let accessiSilenziosi = [];

router.post('/traccia', (req, res) => {
  const { evento, livello, origine } = req.body;

  const entry = {
    evento,
    livello,
    origine,
    tempo: new Date().toISOString()
  };

  logShadow.push(entry);
  console.log(`🕶️ [SHADOW] ${evento} | Livello: ${livello} | Origine: ${origine}`);
  res.json({ esito: 'Evento shadow registrato', entry });
});

router.post('/accesso-silenzioso', (req, res) => {
  const { utente, punto } = req.body;
  const accesso = {
    utente,
    punto,
    invisibile: true,
    tempo: new Date().toISOString()
  };

  accessiSilenziosi.push(accesso);
  res.json({ esito: 'Accesso silenzioso confermato', accesso });
});

router.get('/log', (req, res) => {
  res.json(logShadow);
});

router.get('/accessi', (req, res) => {
  res.json(accessiSilenziosi);
});

module.exports = router;
