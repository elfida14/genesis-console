// server.js - Genesis Core
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3130;

app.use(bodyParser.json());

// Storage semplice in memoria (poi potrai sostituire con DB)
const logs = [];
const users = {
  Baki: { password: "313", role: "admin" },
};

const commandsModule = require("./comandi-estesi");

function logAction(user, action) {
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, user, action });
  console.log(`[${timestamp}] User:${user} -> ${action}`);
}

// Middleware di autenticazione base
app.use((req, res, next) => {
  const user = req.headers["x-user"];
  if (!user || !users[user]) {
    return res.status(401).json({ error: "Accesso negato" });
  }
  req.user = user;
  next();
});

// Endpoint comando
app.post("/command", (req, res) => {
  const { type, data } = req.body;
  const user = req.user;

  if (type !== "command" || !data) {
    return res.status(400).json({ error: "Richiesta non valida" });
  }

  logAction(user, data);

  try {
    // Esegui il comando usando moduli estesi
    const output = commandsModule.executeCommand(data.trim(), user);

    res.json({ response: output });
  } catch (err) {
    res.status(500).json({ error: "Errore interno: " + err.message });
  }
});

// Endpoint per recuperare log (solo admin)
app.get("/logs", (req, res) => {
  if (users[req.user].role !== "admin") {
    return res.status(403).json({ error: "Accesso non autorizzato" });
  }
  res.json(logs);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Genesis attivo", time: new Date().toISOString() });
});

// Avvio server
app.listen(port, () => {
  console.log(`Genesis Core attivo su http://localhost:${port}`);
});
