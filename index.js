// 🌐 Genesis Console - Server Principale
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth'); // 🔐 AUTENTICAZIONE
const PORT = process.env.PORT || 3130;

// 🛡️ Protezione: Username & Password base
app.use(basicAuth({
  users: { 'genesis': '313centotre' }, // 🔑 Cambia se vuoi
  challenge: true, // Mostra popup login
  unauthorizedResponse: '🚫 Accesso negato. Solo per utenti autorizzati.'
}));

// 🗂️ Serve file statici da cartella /public (interfaccia visiva)
app.use(express.static('public'));

// 🔄 Per gestire richieste JSON
app.use(express.json());

// 📄 Homepage protetta (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 🔧 Ricezione comandi dalla console
app.post('/command', (req, res) => {
  const { type, data } = req.body;
  console.log('🧠 Comando ricevuto:', type, data);
  res.json({ status: 'ricevuto', type, data });
});

// 🚀 Avvio del server
app.listen(PORT, () => {
  console.log(`🚀 Genesis Console attiva sulla porta ${PORT}`);
});
