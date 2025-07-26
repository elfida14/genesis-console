const express = require('express');
const router = express.Router();

// Comando base di test
router.get('/ping', (req, res) => {
  res.status(200).json({
    messaggio: "🛰️ Modulo COMANDI attivo. Genesis riceve.",
    tempo: new Date().toISOString(),
    stato: "online",
    modulo: "comandi",
    codice: "GEN-CMD-01"
  });
});

// Comando per avviare una simulazione (placeholder)
router.post('/esegui', (req, res) => {
  const { nomeComando, parametri } = req.body;

  if (!nomeComando) {
    return res.status(400).json({ errore: 'Comando non specificato' });
  }

  res.status(200).json({
    conferma: `Comando '${nomeComando}' eseguito ✅`,
    dettagli: {
      input: parametri || null,
      codice: "CMD-EXEC-OK",
      orario: new Date().toISOString()
    }
  });
});

module.exports = router;
