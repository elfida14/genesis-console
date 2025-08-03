// ─── 1. SETUP BASE ─────────────────────────────────────
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');

// Sicurezza e prestazioni
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logs iniziali
const LOG_PATH = path.join(__dirname, 'logs', 'tlgs.log');
if (!fs.existsSync('logs')) fs.mkdirSync('logs');
fs.appendFileSync(LOG_PATH, `[Genesis avviato @ ${new Date().toISOString()}]\n`);

// Pagine statiche
app.use(express.static(path.join(__dirname, 'public')));

// ─── 2. BLOCCO ACCESSO (RIMOSSO) ───────────────────────
// 🔓 Accesso libero per tutti i comandi

// ─── 3. ROUTES ─────────────────────────────────────────
app.use('/attacco', require('./routes/attacco'));
app.use('/difesa', require('./routes/difesa'));
app.use('/coupon', require('./routes/coupon'));
app.use('/fondi', require('./routes/fondi'));
app.use('/impact', require('./routes/impact-router'));
app.use('/profilo', require('./routes/profilo'));
app.use('/connessioni', require('./routes/connessioni'));
app.use('/tele', require('./routes/tele'));
app.use('/pagamento', require('./routes/paymentEngine'));
app.use('/activation', require('./routes/activation-lock'));

// ✅ COMANDI SPECIALI
app.post('/comandi', (req, res) => {
  const comando = req.body.command?.toUpperCase?.() || '';
  let risposta = '';

  switch (comando) {
    case 'PING':
      risposta = '✅ Genesis è vivo e pronto.';
      break;
    case 'INVIA_50':
      risposta = '🚀 Ordine ricevuto: Invio 50€.';
      break;
    case 'INVIA_20000':
      risposta = '🚀 Ordine ricevuto: Invio 20.000€.';
      break;
    case 'ATTIVA_COUPON':
      risposta = '🎟️ Attivazione coupon avviata.';
      break;
    default:
      risposta = `❓ Comando sconosciuto: ${comando}`;
  }

  fs.appendFileSync(LOG_PATH, `[COMANDO] ${new Date().toISOString()} → ${comando}\n`);
  res.send(risposta);
});

// ─── 4. MODULES ATTIVI ─────────────────────────────────
require('./modules/deploy-commander');
require('./modules/guardian');
require('./modules/impact-engine');
require('./modules/shadow');
require('./modules/fusione');
require('./modules/laigenesis-core');
require('./modules/backup-auto');
require('./modules/xgs');
require('./modules/aiEngine');

// ─── 5. CORE ───────────────────────────────────────────
require('./telegramBot');
require('./diario');

// ─── 6. BASE ROUTES ────────────────────────────────────
app.get('/ping', (req, res) => {
  res.send('✅ Genesis è attivo e ti ascolta, Comandante.');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'console.html'));
});

// ─── 7. ERRORE GLOBALE ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error('🔥 Errore interno:', err);
  res.status(500).send('Errore interno del server Genesis.');
});

// ─── 8. AVVIO SERVER ──────────────────────────────────
const PORT = process.env.PORT || 3131;
app.listen(PORT, () => {
  console.log(`🚀 Genesis è online sulla porta ${PORT}`);
  fs.appendFileSync(LOG_PATH, `🟢 Genesis Console LIVE sulla porta ${PORT}\n`);
});
