// modules/xgs.js
const express = require('express');
const os = require('os');
const router = express.Router();

router.get('/sistema', (req, res) => {
  res.json({
    stato: '🧬 GENESIS 313 attivo',
    moduli_attivi: ['shadow', 'guardian', 'modulo', 'fusione', 'xgs'],
    memoria: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
    cpu: os.cpus()[0].model,
    tempo: new Date().toISOString()
  });
});

router.get('/ping', (req, res) => {
  res.send('🟢 GENESIS Online');
});

module.exports = (app) => {
  app.use('/xgs', router);
};
