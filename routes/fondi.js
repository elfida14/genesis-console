// routes/fondi.js
const express = require('express');
const router = express.Router();

let fondiTracciati = [];
let movimentiRecenti = [];

// Endpoint: Aggiungi nuovo fondo sotto osservazione
router.post('/aggiungi', (req, res) => {
  const { id, tipo, origine, valoreStimato } = req.body;

  if (!id || !tipo || !origine) {
    return res.status(400).json({ errore: 'Dati fondo insufficienti' });
  }

  const fondo = {
    id,
    tipo,
    origine,
    valoreStimato: valoreStimato || 0,
    stato: 'sotto osservazione',
    timestamp: new Date().toISOString()
  };

  fondiTracciati.push(fondo);
  console.log(`[💰 FONDO] ID: ${id} | Tipo: ${tipo} | Origine: ${origine}`);
  res.json({ esito: 'Fondo aggiunto', fondo });
});

// Endpoint: Log movimenti sospetti
router.post('/movimento', (req, res) => {
  const { fondoId, descrizione, entità } = req.body;

  const movimento = {
    fondoId,
    descrizione,
    entità,
    timestamp: new Date().toISOString()
  };

  movimentiRecenti.push(movimento);
  console.log(`[📡 MOVIMENTO] Fondo: ${fondoId} | ${descrizione} | Valore: ${entità}`);
  res.json({ esito: 'Movimento registrato', movimento });
});

// Endpoint: Mostra fondi
router.get('/lista', (req, res) => {
  res.json(fondiTracciati);
});

// Endpoint: Mostra movimenti
router.get('/movimenti', (req, res) => {
  res.json(movimentiRecenti);
});

module.exports = router;
