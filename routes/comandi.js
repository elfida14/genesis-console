const express = require('express');
const router = express.Router();

// Esecuzione comandi generici
router.post('/esegui', (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).send("❌ Comando mancante");
  }

  // Log del comando ricevuto
  console.log(`📥 Comando ricevuto: ${command}`);

  // Esegui risposta di test
  switch (command) {
    case 'INVIA_50':
      return res.send("💸 Invio di 50€ registrato (test).");
    case 'INVIA_20000':
      return res.send("💸 Invio di 20.000€ registrato (test).");
    case 'ATTIVA_COUPON':
      return res.send("🎟️ Codice coupon attivato (test).");
    case 'PING':
      return res.send("🧠 Genesis ti ascolta. Ping ricevuto.");
    default:
      return res.send(`🤖 Comando ricevuto: ${command}`);
  }
});

module.exports = router;
