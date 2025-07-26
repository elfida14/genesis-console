// routes/roadSystemSynaptic.js
const express = require('express');
const router = express.Router();

let nodiAttivi = [];
let incidentiSinaptici = [];

router.post('/attiva-nodo', (req, res) => {
  const { id, tipo, intensità, origine } = req.body;

  if (!id || !tipo) {
    return res.status(400).json({ errore: 'Dati nodo incompleti' });
  }

  const nodo = {
    id,
    tipo,
    intensità,
    origine,
    stato: 'attivo',
    attivato: new Date().toISOString()
  };

  nodiAttivi.push(nodo);
  console.log(`🧠 Nodo attivo: ${id} | Tipo: ${tipo} | Origine: ${origine}`);
  res.json({ esito: 'Nodo sinaptico attivato', nodo });
});

router.post('/log-errore', (req, res) => {
  const { codice, descrizione } = req.body;
  const incidente = {
    codice,
    descrizione,
    ora: new Date().toISOString()
  };

  incidentiSinaptici.push(incidente);
  console.warn(`⚠️ Sinapsi errore: ${codice} - ${descrizione}`);
  res.json({ esito: 'Errore registrato', incidente });
});

router.get('/nodi', (req, res) => {
  res.json(nodiAttivi);
});

router.get('/incidenti', (req, res) => {
  res.json(incidentiSinaptici);
});

module.exports = router;
