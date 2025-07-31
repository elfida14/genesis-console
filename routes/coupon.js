// routes/coupon.js
const express = require("express");
const router = express.Router();
const { validateCoupon, markAsUsed } = require("./couponEngine"); // ✅ percorso corretto
const { sendNotification } = require("./paymentEngine"); // ✅ corretto anche questo

router.post("/", async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ success: false, message: "Codice mancante" });

  const validation = validateCoupon(code);

  if (!validation.valid) {
    return res.status(401).json({ success: false, message: `❌ Coupon non valido: ${validation.reason}` });
  }

  const { action, amount } = validation.data;

  try {
    if (action === "revolut") {
      await sendNotification(amount, `Attivato con coupon: ${code}`);
      markAsUsed(code);
      return res.json({ success: true, message: `✅ Inviato manuale di €${amount} avviato.` });
    }

    // Espandibile: altri tipi di azione
    return res.status(400).json({ success: false, message: "⚠️ Azione non supportata" });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Errore interno nel server" });
  }
});

module.exports = router;
