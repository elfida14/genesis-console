// server.js - Genesis Core (solo Revolut attivo)

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3130;

const payment = require("./paymentEngine");
const logs = [];
const users = {
  Baki: { password: "313", role: "admin" },
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// 🔐 Middleware autenticazione
app.use((req, res, next) => {
  const user = req.headers["x-user"];
  if (!user || !users[user]) {
    return res.status(401).json({ error: "Accesso negato" });
  }
  req.user = user;
  next();
});

// 🩺 Health Check
app.get("/health", (req, res) => {
  res.json({ status: "Genesis attivo", time: new Date().toISOString() });
});

// 🧾 Visualizza log (solo admin)
app.get("/logs", (req, res) => {
  if (users[req.user].role !== "admin") {
    return res.status(403).json({ error: "Accesso non autorizzato" });
  }
  res.json(logs);
});

// 💸 Comando manuale per invio fondi (via Telegram + Email)
app.post("/pay/manual", async (req, res) => {
  const { amount, note } = req.body;
  if (!amount) return res.status(400).json({ error: "Importo mancante" });

  try {
    const result = await payment.sendNotification(amount, note || "Invio fondi");
    logs.push({ timestamp: new Date().toISOString(), user: req.user, action: `Richiesto invio ${amount} EUR` });
    res.json({ status: "Notifica inviata", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Avvio Genesis
app.listen(port, () => {
  console.log(`🌐 Genesis attivo su http://localhost:${port}`);
});
