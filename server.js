// server.js - Genesis Core
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3130;

const wallet = require("./wallet-manager");

app.use(bodyParser.json());

const logs = [];
const users = {
  Baki: { password: "313", role: "admin" },
};

function logAction(user, action) {
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, user, action });
  console.log(`[${timestamp}] User:${user} -> ${action}`);
}

app.use((req, res, next) => {
  const user = req.headers["x-user"];
  if (!user || !users[user]) {
    return res.status(401).json({ error: "Accesso negato" });
  }
  req.user = user;
  next();
});

app.get("/btc/balance", async (req, res) => {
  try {
    const result = await wallet.getBalance();
    logAction(req.user, "Richiesto bilancio BTC");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Errore bilancio: " + err.message });
  }
});

app.post("/btc/send", async (req, res) => {
  const { to, amount } = req.body;
  if (!to || !amount) return res.status(400).json({ error: "Dati mancanti" });

  try {
    const txid = await wallet.sendBTC(to, amount);
    logAction(req.user, `Invio BTC a ${to} (${amount} BTC)`);
    res.json({ txid });
  } catch (err) {
    res.status(500).json({ error: "Errore invio: " + err.message });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "Genesis attivo", time: new Date().toISOString() });
});

app.get("/logs", (req, res) => {
  if (users[req.user].role !== "admin") {
    return res.status(403).json({ error: "Accesso non autorizzato" });
