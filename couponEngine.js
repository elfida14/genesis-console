const express = require('express');
const router = express.Router();

const SEGRETO = process.env.COUPON_SECRET;

router.post('/', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ status: 'missing' });

  if (code === SEGRETO) {
    return res.json({ status: 'valid', message: 'Codice attivato ✅' });
  } else {
    return res.json({ status: 'invalid', message: 'Codice non valido ❌' });
  }
});

module.exports = router;
