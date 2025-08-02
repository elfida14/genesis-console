// server.js
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');
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

// Logs
const LOG_PATH = path.join(__dirname, 'logs', 'tlgs.log');
if (!fs.existsSync('logs')) fs.mkdirSync('logs');
fs.appendFileSync(LOG_PATH, `[Genesis avviato @ ${new Date().toISOString()}]\n`);

// Cartella statica (pagine)
app.use(express.static(path.join(__dirname, 'public')));

// Controllo accesso base (temporaneo)
app.use((req, res, next) => {
  const user = req.headers['x-user'];
  if (!user || user !== process.env.MASTER_KEY) {
    return res.status(401).send('❌ Cento, siamo dentro genesis → Unauthorized');
  }
  next();
});
