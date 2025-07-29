// routes/genesis-broadcast.js
const express = require('express');
const router = express.Router();
const impact = require('../modules/impact-engine');

router.post('/broadcast', async (req, res) => {
  const { message, channel } = req.body;
  try {
    const result = await impact.triggerImpact('broadcast', { message, channel });
    res.json({ status: 'success', data: result.data });
  } catch (err) {
    res.status(500).json({ error: 'Broadcast failed', detail: err.message });
  }
});

module.exports = router;
