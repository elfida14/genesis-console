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

const logger = require('./utils/logger');

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

// Controllo accesso base (x-user === MASTER_KEY)
app.use((req, res, next) => {
  const user = req.headers['x-user'];
  if (!user || user !== process.env.MASTER_KEY) {
    return res.status(401).send('❌ Cento, siamo dentro Genesis → Unauthorized');
  }
  next();
});

// ─── 2. ROUTES E MODULES ───────────────────────────────

// ROUTES da /routes
app.use('/attacco', require('./routes/attacco'));
app.use('/difesa', require('./routes/difesa'));
app.use('/coupon', require('./routes/coupon'));
app.use('/fondi', require('./routes/fondi'));
app.use('/impact', require('./routes/impact-router'));
app.use('/profilo', require('./routes/profilo'));
app.use('/comandi', require('./routes/comandi'));
app.use('/connessioni', require('./routes/connessioni'));
app.use('/tele', require('./routes/tele'));
app.use('/pagamento', require('./routes/paymentEngine'));
app.use('/activation', require('./routes/activation-lock'));

// MODULES da /modules
require('./modules/deploy-commander');
require('./modules/genesis-awakening');
require('./modules/guardian');
require('./modules/impact-engine');
require('./modules/shadow');
require('./modules/fusione');
require('./modules/laigenesis-core');
require('./modules/backup-auto');
require('./modules/xgs');
require('./modules/aiEngine');

// CORE da root
require('./voice-console.is');
require('./telegramBot');
require('./utils/logger');
require('./diario');

// ─── 3. ROUTE DI BASE E AVVIO ──────────────────────────

// Test di vita
app.get('/ping', (req, res) => {
  res.send('✅ Genesis è attivo e ti ascolta, Comandante.');
});

// Console web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'console.html'));
});

// Gestione errori interni
app.use((err, req, res, next) => {
  console.error('🔥 Errore interno:', err);
  res.status(500).send('Errore interno del server Genesis.');
});

// Avvio server
const PORT = process.env.PORT || 3131;
app.listen(PORT, () => {
  console.log(`🚀 Genesis è online sulla porta ${PORT}`);
  logger.info(`🟢 Genesis Console LIVE sulla porta ${PORT}`);
});
