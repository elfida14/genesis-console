const express = require('express');
const router = express.Router();

const COUPONS = {
  'GEN-20000': { amount: 20000, message: 'Donazione strategica Genesis' },
  'GEN-50': { amount: 50, message: 'Missione giornaliera 50€' },
};

router.post('/', (req, res) => {
  const { code } = req.body;
  const data = COUPONS[code];
  if (data) {
    res.json({ status: 'valid', ...data });
  } else {
    res.status(404).json({ status: 'invalid', error: 'Coupon non valido' });
  }
});

module.exports = router;
