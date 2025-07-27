// modules/guardian.js
const express = require('express');
const router = express.Router();

const vocalKey = process.env.GUARDIAN_KEY || 'guardian-voce';
let allarmi = [];

router.post('/attiva', (req, res) => {
  const { codice, livello, segnale } = req.body;

  if (codice !== vocalKey) {
    return res.status(401).json({ errore: 'Codice vocale non valido' });
  }

  const evento = {
    livello,
    segnale,
    tempo: new Date().toISOString()
  };

  allarmi.push(evento);
  console.log(`🛡️ [GUARDIAN] Livello ${livello} | Segnale: ${segnale}`);
  res.json({ esito: 'Difesa attivata', evento });
});

router.get('/stato', (req, res) => {
  res.json({ attivi: allarmi });
});

module.exports = (app) => {
  app.use('/guardian', router);
};
