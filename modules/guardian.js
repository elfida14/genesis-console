// modules/guardian.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const vocalKey = process.env.GUARDIAN_KEY || 'guardian-voce';
const livelloCritico = 8;
let allarmi = [];

function hashInput(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

router.post('/attiva', (req, res) => {
  const { codice, livello, segnale, identità } = req.body;

  if (hashInput(codice) !== hashInput(vocalKey)) {
    return res.status(403).json({ errore: '🔒 Codice vocale errato o non riconosciuto' });
  }

  const evento = {
    identità: identità || 'Sconosciuto',
    livello: livello || 1,
    segnale: segnale || 'default',
    codice_risposta: crypto.randomBytes(4).toString('hex'),
    tempo: new Date().toISOString()
  };

  allarmi.push(evento);

  console.log(`🛡️ [GUARDIAN v8] Allarme LIV-${evento.livello} da ${evento.identità} | Segnale: ${evento.segnale}`);
  
  if (evento.livello >= livelloCritico) {
    // Possibile attivazione futura: connessione AI o blocco accessi
    console.warn(`⚠️ LIVELLO CRITICO RILEVATO: ${evento.livello}`);
  }

  res.json({ stato: '✅ Difesa Attivata', evento });
});

router.get('/stato', (req, res) => {
  res.json({ difese_attive: allarmi.length, allarmi });
});

module.exports = (app) => {
  app.use('/guardian', router);
};
