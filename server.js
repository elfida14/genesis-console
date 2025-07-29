// server.js - Genesis Core
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3130;

const commandsModule = require("./comandi-estesi");
const impactModule = require("./modules/impact-engine");
const deployCommander = require("./modules/deploy-commander");
const broadcastRoute = require("./routes/genesis-broadcast");

app.use(bodyParser.json());

// 📦 Storage temporaneo in memoria
const logs = [];
const users = {
  Baki: { password: "313", role: "admin" },
};

// 📋 Log interno
function logAction(user, action) {
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, user, action });
  console.log(`[${timestamp}] User:${user} -> ${action}`);
}

// 🔐 Middleware autenticazione base
app.use((req, res, next) => {
  const user = req.headers["x-user"];
  if (!user || !users[user]) {
    return res.status(401).json({ error: "Accesso negato" });
  }
  req.user = user;
  next();
});

// ⚙️ Comando AI
app.post("/command", (req, res) => {
  const { type, data } = req.body;
  const user = req.user;

  if (type !== "command" || !data) {
    return res.status(400).json({ error: "Richiesta non valida" });
  }

  logAction(user, data);

  try {
    const output = commandsModule.executeCommand(data.trim(), user);
    res.json({ response: output });
  } catch (err) {
    res.status(500).json({ error: "Errore interno: " + err.message });
  }
});

// 🛰️ Broadcast da AI al mondo
app.use("/genesis", broadcastRoute);

// 🧬 Impatto diretto (esempio: /impact/manuale)
app.post("/impact/:azione", async (req, res) => {
  const user = req.user;
  const azione = req.params.azione;
  const payload = req.body;

  try {
    const result = await impactModule.triggerImpact(azione, payload);
    logAction(user, `IMPACT → ${azione}`);
    res.json({ result: result.data || "OK" });
  } catch (err) {
    res.status(500).json({ error: "Errore IMPACT: " + err.message });
  }
});

// 🧠 Comandi Shell (esempio deploy locale/remoto)
app.post("/deploy", (req, res) => {
  const command = req.body.command;
  if (!command) return res.status(400).json({ error: "Comando mancante" });

  deployCommander.run(command, (err, output) => {
    if (err) return res.status(500).json({ error: "Deploy fallito: " + err.message });
    res.json({ output });
  });
});

// 🔐 Log accessibili solo da admin
app.get("/logs", (req, res) => {
  if (users[req.user].role !== "admin") {
    return res.status(403).json({ error: "Accesso non autorizzato" });
  }
  res.json(logs);
});

// 💡 Health check
app.get("/health", (req, res) => {
  res.json({ status: "Genesis attivo", time: new Date().toISOString() });
});

// 🔊 Avvio
app.listen(port, () => {
  console.log(`🌐 Genesis Core attivo su http://localhost:${port}`);
});
