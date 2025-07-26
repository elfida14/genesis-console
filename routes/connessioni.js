const express = require('express');
const router = express.Router();

let connessioniAttive = [];

// 📥 Attiva una nuova connessione
router.post('/attiva', (req, res) => {
  console.log('POST /attiva ricevuta');
  console.log('Body ricevuto:', req.body);

  const { id, tipo, descrizione } = req.body;

  if (!id || !tipo) {
    console.log('❌ Richiesta attivazione senza id o tipo');
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

  console.log(`✅ Connessione ${id} attivata di tipo ${tipo}`);
  res.status(200).json({
    messaggio: `Connessione ${id} attivata ✅`,
    dettagli: nuovaConn
  });
});

// 📤 Recupera tutte le connessioni attive
router.get('/attive', (req, res) => {
  console.log('📄 Richiesta elenco connessioni attive');
  res.status(200).json({ connessioniAttive });
});

// ❌ Disattiva una connessione
router.post('/disattiva', (req, res) => {
  console.log('POST /disattiva ricevuta');
  console.log('Body ricevuto:', req.body);

  const { id } = req.body;

  const index = connessioniAttive.findIndex(c => c.id === id);

  if (index === -1) {
    console.log(`❌ Tentativo di disattivare connessione non trovata: ${id}`);
    return res.status(404).json({ errore: 'Connessione non trovata' });
  }

  connessioniAttive[index].stato = 'disattivata';
  connessioniAttive[index].disattivata = new Date();

  console.log(`❌ Connessione ${id} disattivata`);
  res.status(200).json({
    messaggio: `Connessione ${id} disattivata ❌`,
    dettagli: connessioniAttive[index]
  });
});

// 🔄 Reset connessioni (solo per debug o reset rapido)
router.post('/reset', (req, res) => {
  console.log('POST /reset ricevuta');
  connessioniAttive = [];
  console.log('🧹 Tutte le connessioni sono state resettate');
  res.status(200).json({ messaggio: 'Tutte le connessioni sono state resettate 🧹' });
});

module.exports = router;
