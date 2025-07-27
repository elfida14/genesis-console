// modules/fusione.js
const express = require('express');
const router = express.Router();

let connessioni = [];
let pontiLogici = {};

router.post('/collega', (req, res) => {
  const { nodo, tipo, valore } = req.body;

  const link = {
    nodo,
    tipo,
    valore,
    tempo: new Date().toISOString()
  };

  connessioni.push(link);

  if (!pontiLogici[tipo]) pontiLogici[tipo] = [];
  pontiLogici[tipo].push(link);

  res.json({ esito: 'Nodo cognitivo collegato', link });
});

router.get('/connessioni', (req, res) => {
  res.json({ totali: connessioni.length, connessioni, pontiLogici });
});

router.get('/cervello', (req, res) => {
  res.json({
    stato: '🧠 Attivo',
    nodi: Object.keys(pontiLogici),
    connessioni_totali: connessioni.length,
    tempo: new Date().toISOString()
  });
});

module.exports = (app) => {
  app.use('/fusione', router);
};
