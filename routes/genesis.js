const express = require('express');
const router = express.Router();

// 🔐 Middleware speciale per il modulo Genesis
router.use((req, res, next) => {
  const codice = req.headers['x-access-genesis'] || '';
  const utente = req.headers['x-user'] || 'sconosciuto';

  console.log(`🌌 [GENESIS] Accesso da ${utente} con codice: ${codice}`);

  if (utente !== 'Baki' || codice !== '313GENESIS') {
    return res.status(403).json({
      errore: '🔒 Accesso negato al modulo Genesis',
      suggerimento: 'Controlla le credenziali o contatta Cento',
    });
  }

  next();
});

// 🔄 Risposta dinamica Genesis
router.get('/', (req, res) => {
  const ora = new Date().toISOString();
  res.json({
    stato: '✅ Genesis online',
    modulo: 'GENESIS',
    accesso: 'autorizzato',
    messaggio: '✨ Modulo attivo. Che la creazione abbia inizio.',
    timestamp: ora,
    livello: 21,
    consigliatoProssimoModulo: '📞 phone.js (Modulo 21)',
  });
});

// 📡 Endpoint secondario per test connessione Genesis
router.get('/ping', (req, res) => {
  res.json({
    risposta: '📶 Pong da Genesis',
    codice: 'GNS-313-✓',
  });
});

module.exports = router;
