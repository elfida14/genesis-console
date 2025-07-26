// routes/satellite.js
const express = require('express');
const fs = require('fs');
const router = express.Router();

const LOG_FILE = 'logs/tlgs.log';

// 🌌 Funzione per scrivere log
function logEvent(evento) {
  const entry = `[SATELLITE] ${new Date().toISOString()} - ${evento}\n`;
  fs.appendFile(LOG_FILE, entry, err => {
    if (err) console.error('Errore nel logging TLGS:', err);
  });
}

// 🛰️ POST /satellite/attiva → attiva un modulo remoto
router.post('/attiva', (req, res) => {
  const { id, tipo, descrizione } = req.body;
  const utente = req.headers['x-user'] || 'anonimo';

  if (!id || !tipo) {
    logEvent(`❌ Errore da ${utente} - Dati incompleti`);
    return res.status(400).json({ errore: 'ID e tipo richiesti' });
  }

  // ✅ Simulazione attivazione modulo
  const statoModulo = {
    id,
    tipo,
    attivo: true,
    ricevutoDa: utente,
    descrizione: descrizione || 'Nessuna descrizione fornita',
    risposta: `Modulo ${id} di tipo ${tipo} attivato correttamente.`,
    sincronizzato: true,
    codice: `TLGS-${Date.now()}`
  };

  logEvent(`✅ Attivazione richiesta da ${utente} per ${id} (${tipo})`);
  res.status(200).json(statoModulo);
});

module.exports = router;
