    // routes/couponEngine.js
const express = require('express');
const router = express.Router();
const { log } = require('../utils/logger');

router.post('/', (req, res) => {
  const { code, amount } = req.body;

  if (!code || !amount) {
    log('❌ Coupon non valido — dati mancanti');
    return res.status(400).json({ error: 'Codice coupon o importo mancante' });
  }

  log(`🎟️ Coupon ricevuto: ${code} per €${amount}`);
  return res.status(200).json({ status: 'success', message: `Coupon ${code} accettato` });
});

module.exports = router; 
