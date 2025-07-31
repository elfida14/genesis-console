// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3133;

// Sicurezza base
const AUTH_KEY = 'shadow313-core';

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Autenticazione semplice via header
app.use((req, res, next) => {
  const userKey = req.headers['x-user'];
  if (userKey && userKey === AUTH_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
});

// === ROUTES === //
app.use('/api/attacco', require('./routes/attacco'));
app.use('/api/difesa', require('./routes/difesa'));
app.use('/api/impact', require('./routes/impact-router'));
app.use('/api/coupon', require('./routes/coupon'));
app.use('/api/modulo', require('./routes/modulo10–17'));
app.use('/api/road', require('./routes/roadSystemSynaptic'));

// Revolut Payment Router
app.use('/api/revolut', require('./src/paymentEngine'));

// Ping
app.get('/ping', (req, res) => {
  res.send('🔁 Genesis online — PING OK');
});

// Comando test
app.post('/command', (req, res) => {
  const { cmd } = req.body;
  console.log(`📡 Comando ricevuto: ${cmd}`);
  res.json({ status: 'ok', message: `Comando "${cmd}" eseguito` });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).send('🌌 Endpoint non trovato');
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Genesis Console attiva su porta ${PORT}`);
});
