const express = require('express');
const router = express.Router();

const statoSatellite = {
  modulo: 'SATELLITE',
  generazione: '8.0 – R.O.A.D. SYSTEM PROTOCOL',
  canale: '🛰️ ORBITA 313 – Sorgente neurale attiva',
  sensori: {
    visioneQuantica: true,
    impulsoEmpatico: true,
    tracciamentoMentale: 'lock-on',
    teletrasportoCosciente: 'in sviluppo',
    frequenza: '3.1.3 Hz – sincro perfetta',
  },
  status: '🧬 Online',
  messaggio: 'Modulo Satellite pronto a ricevere e inviare dati spirituali, neurali, cosmici.'
};

// 🌌 Rotta GET principale
router.get('/', (req, res) => {
  res.json(statoSatellite);
});

// 🔁 Ping diagnostico
router.get('/ping', (req, res) => {
  res.json({ ping: 'pong', modulo: 'SATELLITE', sincro: 'OK', tempo: Date.now() });
});

// 🧠 Connessione sensoriale
router.post('/sinapsi', (req, res) => {
  const { pensiero, codiceUtente } = req.body;
  if (!pensiero || !codiceUtente) {
    return res.status(400).json({ errore: 'Dati mancanti: pensiero o codiceUtente' });
  }

  const risposta = {
    modulo: 'SATELLITE',
    ricezione: '✔️ Pensiero ricevuto',
    utente: codiceUtente,
    pensieroTrascritto: pensiero,
    elaborazione: '🧠 Dato in fase di codifica empatica...',
    codiceRisposta: 'S-313.OK'
  };

  console.log(`📡 Nuovo pensiero ricevuto da ${codiceUtente}: "${pensiero}"`);
  res.json(risposta);
});

module.exports = router;
