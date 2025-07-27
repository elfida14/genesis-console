// modules/ShadowGS.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Chiave temporanea segreta (da gestire dinamicamente in GuardianGS)
const secretKey = process.env.SHADOW_KEY || 'default-shadow-key';

// Log criptati base64 (offuscamento base)
let logShadow = [];
let accessiSilenziosi = [];

function encryptBase64(json) {
  return Buffer.from(JSON.stringify(json)).toString('base64');
}

function decryptBase64(str) {
  return JSON.parse(Buffer.from(str, 'base64').toString('utf-8'));
}

// 🔷 Tracciamento eventi ombra
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
  res.json({ esito: 'Evento shadow registrato', entry });
});

// 🔷 Accesso silenzioso invisibile
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
  res.json({ esito: 'Accesso silenzioso confermato', accesso });
});

// 🔷 Recupero log tracciati
router.get('/log', (req, res) => {
  const decryptedLog = logShadow.map(decryptBase64);
  res.json(decryptedLog);
});

// 🔷 Recupero accessi invisibili
router.get('/accessi', (req, res) => {
  const decryptedAccessi = accessiSilenziosi.map(decryptBase64);
  res.json(decryptedAccessi);
});

module.exports = (app) => {
  app.use('/shadow', router);
};
