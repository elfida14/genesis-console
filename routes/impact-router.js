const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/impact", (req, res) => {
  const { type, payload } = req.body;
  const user = req.headers["x-user"] || "anon";

  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] IMPACT TRIGGERED BY ${user} >> ${type}`;

  // Salva nel log
  fs.appendFileSync(path.join(__dirname, "../logs/impact.log"), logLine + "\n");

  // Azioni base di impatto
  if (type === "broadcast") {
    // esempio azione reale
    console.log(">> Broadcasting:", payload);
    // qui potresti aggiungere: invio webhook, email, tweet, log chain...
  }

  if (type === "chain-ignite") {
    // Azione importante: accende un motore critico
    console.log(">> 🔥 Genesis Ignition Command Activated");
    // puoi interagire con moduli: guardian, deploy-commander, ecc.
  }

  res.json({ status: "Impatto avvenuto", type, user });
});

module.exports = router;
