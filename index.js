const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth'); // AUTENTICAZIONE
const PORT = process.env.PORT || 3130;

// Protezione: Username & Password base
app.use(basicAuth({
  users: { 'genesis': '313centotre' },
  challenge: true, // Mostra il popup di login nel browser
  unauthorizedResponse: '🚫 Accesso negato. Solo per utenti autorizzati.'
}));

// Permetti al server di leggere file da /public (interfaccia visiva)
app.use(express.static('public'));

app.use(express.json());

// Homepage: mostra index.html (nascosto dietro login)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Endpoint per ricevere comandi dalla console visiva
app.post('/command', (req, res) => {
  const { type, data } = req.body;
  console.log('🧠 Comando ricevuto:', type, data);
  res.json({ status: 'ricevuto', type, data });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Genesis Console attiva sulla porta ${PORT}`);
});
