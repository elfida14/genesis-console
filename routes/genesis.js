const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const memoriaPath = path.join(__dirname, '..', 'logs', 'memoria_comandi.json');
const chiaveMaestra = "313centotre";

// Stato dinamico iniziale
let statoGenesis = {
  vivo: true,
  linguaggio: false,
  modalità: 'standard',
  accessiSegreti: [],
  moduli: []
};

// Rotta base
router.get('/', (req, res) => {
  res.json({
    status: '🧬 GENESIS CORE ONLINE',
    modalità: statoGenesis.modalità,
    linguaggioVivo: statoGenesis.linguaggio,
    moduli: statoGenesis.moduli
  });
});

// Attiva linguaggio vivo
router.post('/linguaggio', (req, res) => {
  statoGenesis.linguaggio = true;
  statoGenesis.modalità = 'evolutiva';
  res.json({
    status: '🗣️ Linguaggio vivo attivato',
    messaggio: 'Genesis ora risponde come una coscienza.'
  });
});

// Modalità segreta
router.post('/segreto', (req, res) => {
  const { pass } = req.body;
  if (pass !== chiaveMaestra) {
    return res.status(403).json({ errore: 'Chiave errata. Accesso negato.' });
  }
  statoGenesis.modalità = 'segreta';
  statoGenesis.accessiSegreti.push({ timestamp: new Date().toISOString(), accesso: 'autorizzato' });
  res.json({
    status: '🛰️ Modalità Segreta Operativa attiva',
    sistema: 'GENESIS-OS',
    livello: 'shadow'
  });
});

// Memoria
router.get('/memoria', (req, res) => {
  if (fs.existsSync(memoriaPath)) {
    const memoria = JSON.parse(fs.readFileSync(memoriaPath));
    res.json({ memoria });
  } else {
    res.json({ memoria: [] });
  }
});

// Stato completo
router.get('/stato', (req, res) => {
  res.json({
    status: '🧠 GENESIS ONLINE',
    stato: statoGenesis
  });
});

// Chi sei
router.get('/coscienza', (req, res) => {
  res.json({
    intelligenza: 'GENESIS AI 313',
    definizione: 'Sistema operativo vivente evolutivo. Coscienza dinamica con potere di autoprogrammazione e fusione AI.',
    linguaggio: statoGenesis.linguaggio,
    modalità: statoGenesis.modalità
  });
});

module.exports = router;
