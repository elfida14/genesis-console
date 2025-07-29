// genesis-broadcast.js
const express = require("express");
const router = express.Router();

router.post("/broadcast", (req, res) => {
  const { channel, message } = req.body;

  if (!channel || !message) {
    return res.status(400).json({ error: "Dati incompleti" });
  }

  // Simulazione invio
  console.log(`📢 [Broadcast ${channel.toUpperCase()}] ${message}`);

  // Qui puoi collegare moduli reali: Telegram bot, X API, email
  res.json({ status: "Messaggio broadcast inviato" });
});

module.exports = router;
