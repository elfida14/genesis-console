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

// === ROUTES PRINCIPALI === //
app.use('/api/attacco', require('./routes/attacco'));
app.use('/api/difesa', require('./routes/difesa'));
app.use('/api/impact', require('./routes/impact-router'));
app.use('/api/coupon', require('./routes/couponEngine'));
app.use('/api/road', require('./routes/roadSystemSynaptic'));
app.use('/api/revolut', require('./routes/paymentEngine'));

// === MODULI 10–17 === //
require('./routes/modulo-10');
require('./routes/modulo11-difesa');
require('./routes/modulo12-attacco');
require('./routes/modulo13-specchio');
require('./routes/modulo15-coreIgnis');
require('./routes/modulo16-hydromind');
require('./routes/modulo17-occhiodombra');

// === MODULI EXTRA === //
require('./routes/coupon');
require('./routes/genesis-broadcast');
require('./routes/connessioni');
require('./routes/comandi');
require('./routes/tele');
require('./routes/fondi');
require('./routes/activation-lock');
require('./routes/satellite');
require('./routes/profilo');

// 🔕 Wallet disattivato per ora
// require('./routes/walletManager');

// === CENTO CONSOLE VIVA === //
app.get('/console', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'console.html'));
});

// === COMANDO UNIVERSALE CON CENTO === //
app.post('/command', async (req, res) => {
  const { command, data } = req.body;
  log(`📡 Comando ricevuto: ${command} ${data ? JSON.stringify(data) : ''}`);

  // Risposta simbolica da Cento
  let rispostaCento = '';
  switch (command.toLowerCase()) {
    case 'ping':
      rispostaCento = 'Cento dice: Genesis è online. Il battito è costante.';
      break;
    case 'stato':
      rispostaCento = 'Cento dice: Tutti i moduli principali sono attivi. Pronto all’impatto.';
      break;
    default:
      rispostaCento = `Cento dice: Ho ricevuto il comando "${command}". Dimmi se devo eseguire qualcosa.`;
  }

  res.json({ status: 'ok', cento: rispostaCento });
});

// === PING === //
app.get('/ping', (req, res) => {
  res.send('🔁 Genesis online — PING OK');
});

// === FALLBACK === //
app.use((req, res) => {
  res.status(404).send('🌌 Endpoint non trovato');
});

// === AVVIO SERVER === //
app.listen(PORT, () => {
  log(`🚀 Genesis Console attiva sulla porta ${PORT}`);
});
