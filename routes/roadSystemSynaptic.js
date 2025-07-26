// routes/roadSystemSynaptic.js
const express = require('express');
const router = express.Router();

let nodiSinaptici = [];
let segnalazioniTraffico = [];

// Endpoint: Aggiungi nodo sinaptico (incrocio strategico o nodo AI)
router.post('/nodo', (req, res) => {
  const { id, tipo, coordinate, intensità } = req.body;

  if (!id || !tipo || !coordinate) {
    return res.status(400).json({ errore: 'Dati nodo incompleti' });
  }

  const nodo = {
    id,
    tipo,
    coordinate,
    intensità: intensità || 'media',
    stato: 'attivo',
    timestamp: new Date().toISOString()
  };

  nodiSinaptici.push(nodo);
  console.log(`[🧠 NODO] ID: ${id} | Tipo: ${tipo} | Coord: ${coordinate}`);
  res.json({ esito: 'Nodo sinaptico registrato', nodo });
});

// Endpoint: Registra segnalazione (traffico, blocco, anomalia)
router.post('/segnalazione', (req, res) => {
  const { nodoId, descrizione, priorità } = req.body;

  const segnalazione = {
    nodoId,
    descrizione,
    priorità: priorità || 'bassa',
    timestamp: new Date().toISOString()
  };

  segnalazioniTraffico.push(segnalazione);
  console.log(`[🚨 SEGNALAZIONE] Nodo: ${nodoId} | ${descrizione} | Priorità: ${priorità}`);
  res.json({ esito: 'Segnalazione ricevuta', segnalazione });
});

// Endpoint: Lista nodi
router.get('/nodi', (req, res) => {
  res.json(nodiSinaptici);
});

// Endpoint: Lista segnalazioni
router.get('/segnalazioni', (req, res) => {
  res.json(segnalazioniTraffico);
});

module.exports = router;
