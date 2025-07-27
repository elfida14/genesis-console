// modules/shadow.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Chiave di sicurezza base (verrà poi gestita da Guardian.js)
const secretKey = process.env.SHADOW_KEY || 'default-shadow-key';

let logShadow = [];
let accessiSilenziosi = [];

// Cripta e decripta in base64 (per offuscamento semplice)
function encryptBase64(data) {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

function decryptBase64(str) {
  return JSON.parse(Buffer.from(str, 'base64').toString('utf8'));
}

// 🔸 Tracciamento eventi ombra
router.post('/traccia', (req, res) => {
  const { evento, livello, origine, chiave } = req.body;

  if (chiave !== secretKey) {
    return res.status(403).json({ errore: 'Chiave non valida' });
  }

  const entry = {
    evento,
    livello,
    origine,
    tempo: new Date().toISOString()
  };

  logShadow.push(encryptBase64(entry));
  console.log(`🕶️ [SHADOW] ${evento} | Livello: ${livello} | Origine: ${origine}`);
  res.json({ esito: 'Evento registrato', entry });
});

// 🔹 Accessi silenziosi (monitor invisibile)
router.post('/accesso-silenzioso', (req, res) => {
  const { utente, punto, chiave } = req.body;

  if (chiave !== secretKey) {
    return res.status(403).json({ errore: 'Chiave non valida' });
  }

  const accesso = {
    utente,
    punto,
    invisibile: true,
    tempo: new Date().toISOString()
  };

  accessiSilenziosi.push(encryptBase64(accesso));
  res.json({ esito: 'Accesso silenzioso registrato', accesso });
});

// 🔍 Recupero eventi shadow
router.get('/log', (req, res) => {
  const dati = logShadow.map(decryptBase64);
  res.json(dati);
});

// 🔍 Recupero accessi silenziosi
router.get('/accessi', (req, res) => {
  const dati = accessiSilenziosi.map(decryptBase64);
  res.json(dati);
});

// 📎 Esportazione
module.exports = (app) => {
  app.use('/shadow', router);
};
