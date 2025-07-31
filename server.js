// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { log } = require('./utils/logger');
const app = express();
const PORT = process.env.PORT || 3133;

// Sicurezza base
const AUTH_KEY = process.env.GENESIS_USER || 'shadow313-core';

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Autenticazione via header
app.use((req, res, next) => {
  const userKey = req.headers['x-user'];
  if (userKey === AUTH_KEY) {
    next();
  } else {
    log('🔐 Tentativo non autorizzato bloccato');
    res.status(403).json({ error: 'Unauthorized' });
  }
});

// === ROUTES === //
app.use('/api/attacco', require('./routes/attacco'));
app.use('/api/difesa', require('./routes/difesa'));
app.use('/api/impact', require('./routes/impact-router'));
app.use('/api/coupon', require('./routes/couponEngine'));
app.use('/api/road', require('./routes/roadSystemSynaptic'));
app.use('/api/revolut', require('./routes/paymentEngine'));

// Moduli 10–17 separati
require('./routes/modulo-10');
require('./routes/modulo11-difesa');
require('./routes/modulo12-attacco');
require('./routes/modulo13-specchio');
require('./routes/modulo15-coreIgnis');
require('./routes/modulo16-hydromind');
require('./routes/modulo17-occhiodombra');

// Moduli extra (se servono)
require('./routes/walletManager');
require('./routes/coupon');
require('./routes/genesis-broadcast');
require('./routes/connessioni');
require('./routes/comandi');
require('./routes/tele');
require('./routes/fondi');
require('./routes/activation-lock');
require('./routes/satellite');
require('./routes/profilo');

// Comando universale
app.post('/command', (req, res) => {
  const { command, data } = req.body;
  log(`📡 Comando ricevuto: ${command} ${data ? JSON.stringify(data) : ''}`);
  res.json({ status: 'ok', message: `Comando "${command}" eseguito` });
});

// Test ping
app.get('/ping', (req, res) => {
  res.send('🔁 Genesis online — PING OK');
});

// Fallback 404
app.use((req, res) => {
  res.status(404).send('🌌 Endpoint non trovato');
});

// Avvio server
app.listen(PORT, () => {
  log(`🚀 Genesis Console attiva sulla porta ${PORT}`);
});
