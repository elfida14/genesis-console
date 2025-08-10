// routes/walletManager.js
const express = require('express');
const router = express.Router();

/*
  Wallet Manager (simulato)
  - Questo router espone endpoint semplici e sicuri per test.
  - NON esegue operazioni reali su wallet: è un mock/simulazione per sviluppo.
*/

// health check
router.get('/', (req, res) => {
  res.json({ ok: true, module: 'walletManager' });
});

// get balance (simulato)
router.get('/balance', (req, res) => {
  // puoi collegare qui la logica reale al bisogno
  res.json({ balance: 0.0, currency: 'EUR' });
});

// simulate send
router.post('/send', (req, res) => {
  const { to, amount } = req.body || {};
  if (!to || !amount) return res.status(400).json({ error: 'missing to or amount' });

  // log sul server
  console.log(`[walletManager] send simulated -> to:${to} amount:${amount}`);

  // response simulata
  return res.json({
    status: 'queued',
    to,
    amount,
    ts: new Date().toISOString()
  });
});

module.exports = router;
