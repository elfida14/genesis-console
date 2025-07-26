const express = require('express');
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3130;

// Autenticazione: login sacro Genesis
app.use(basicAuth({
  users: { 'genesis': '313centotre' },
  challenge: true,
  unauthorizedResponse: '🚫 Accesso negato.'
}));

// Leggi file statici da /public
app.use(express.static('public'));
app.use(express.json());

// Home nascosta dietro login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// 🔁 ROUTE COMANDI GENERALI (console)
app.post('/command', (req, res) => {
  const { type, data } = req.body;
  console.log(`🧠 Comando ricevuto: ${type}`, data);

  // 🔁 Elabora qui i comandi ricevuti
  if (type === 'ATTACCO') {
    // Codice modulo attacco
  } else if (type === 'DIFESA') {
    // Codice modulo difesa
  } else if (type === 'FONDI') {
    // Codice per fondi e gestione economica
  } else if (type === 'PROFILO') {
    // Gestione profilo utente
  } else if (type === 'GENESI') {
    // Modulo Genesi speciale
  } else {
    // Comando sconosciuto
    console.log("❓ Comando non riconosciuto");
  }

  res.json({ status: 'ricevuto', comando: type });
});

// 🌐 API interna per visualizzare i moduli attivi
app.get('/moduli', (req, res) => {
  res.json({
    attacco: true,
    difesa: true,
    fondi: true,
    profilo: true,
    genesi: true,
    stato: '🟢 Attiva'
  });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Genesis Console attiva sulla porta ${PORT}`);
});
