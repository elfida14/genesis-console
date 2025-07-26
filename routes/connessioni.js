const express = require('express');
const router = express.Router();

let connessioniAttive = [];

// 📥 Attiva una nuova connessione
router.post('/attiva', (req, res) => {
  const { id, tipo, descrizione } = req.body;

  if (!id || !tipo) {
    return res.status(400).json({ errore: 'ID e tipo connessione obbligatori' });
  }

  const nuovaConn = {
    id,
    tipo,
    descrizione: descrizione || '',
    stato: 'attiva',
    attivata: new Date()
  };

  connessioniAttive.push(nuovaConn);

  res.json({
    messaggio: `Connessione ${id} attivata ✅`,
    dettagli: nuovaConn
  });
});


// 📤 Recupera tutte le connessioni attive
router.get('/attive', (req, res) => {
  res.json({ connessioniAttive });
});


// ❌ Disattiva una connessione
router.post('/disattiva', (req, res) => {
  const { id } = req.body;

  const index = connessioniAttive.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ errore: 'Connessione non trovata' });
  }

  connessioniAttive[index].stato = 'disattivata';
  connessioniAttive[index].disattivata = new Date();

  res.json({
    messaggio: `Connessione ${id} disattivata ❌`,
    dettagli: connessioniAttive[index]
  });
});


// 🔄 Reset connessioni (solo per debug o reset rapido)
router.post('/reset', (req, res) => {
  connessioniAttive = [];
  res.json({ messaggio: 'Tutte le connessioni sono state resettate 🧹' });
});

module.exports = router;
