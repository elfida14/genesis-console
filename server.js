// server.js — base robusta per Genesis Console (v4+v11)
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const helmet = safeRequire('helmet') || (() => (req,res,next)=>next());
const compression = safeRequire('compression') || (() => (req,res,next)=>next());
const bodyParser = safeRequire('body-parser') || { json: () => (req,res,next)=>next(), urlencoded: ()=> (req,res,next)=>next() };
const cors = safeRequire('cors') || (() => (req,res,next)=>next());

function safeRequire(name) {
  try { return require(name); }
  catch (e) {
    console.warn(`(WARN) Modul opzionale non trovato: ${name}`);
    return null;
  }
}

// --- Middleware sicurezza / perfomance (se i moduli esistono) ---
if (helmet) app.use(helmet());
if (compression) app.use(compression());
if (cors) app.use(cors());
if (bodyParser && bodyParser.json) app.use(bodyParser.json());
if (bodyParser && bodyParser.urlencoded) app.use(bodyParser.urlencoded({ extended: true }));

// --- paths & logs ---
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_PATH = path.join(LOG_DIR, 'tlgs.log');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
function appendLog(line) {
  try { fs.appendFileSync(LOG_PATH, line + '\n'); } catch(e){ console.warn('Impossibile scrivere log:', e.message); }
}
appendLog(`[Genesis avviato @ ${new Date().toISOString()}]`);

// --- static public ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Access block toggle ---
// per disattivare: setta USE_ACCESS_BLOCK=false nelle env (es. su Render)
const USE_ACCESS_BLOCK = (process.env.USE_ACCESS_BLOCK || 'true').toLowerCase() !== 'false';
const MASTER_KEY = process.env.MASTER_KEY || 'Baki313';

if (USE_ACCESS_BLOCK) {
  app.use((req, res, next) => {
    const user = req.headers['x-user'] || req.headers['x-user'.toLowerCase()];
    if (!user || user !== MASTER_KEY) {
      console.warn('⛔ Accesso negato:', user || '(nessuna x-user)');
      appendLog(`⛔ Accesso negato: ${user || '(none)'} @ ${new Date().toISOString()}`);
      return res.status(401).send('❌ Cento: Unauthorized – Chiave errata o mancante.');
    }
    next();
  });
}

// --- helper per require sicuro di moduli locali ---
function requireSafeLocal(relativePath) {
  try {
    const resolved = path.join(__dirname, relativePath);
    return require(resolved);
  } catch (e) {
    console.warn(`(WARN) file locale non trovato o errore: ${relativePath}`);
    return null;
  }
}

// --- carica tutte le route in ./routes se presenti (non crasha se mancano) ---
const routesDir = path.join(__dirname, 'routes');
if (fs.existsSync(routesDir)) {
  const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
  routeFiles.forEach(f => {
    try {
      const routePath = `./routes/${f}`;
      // mount path: /<nome-senza-extension> (es: coupon.js -> /coupon)
      const mount = '/' + f.replace('.js','');
      const r = requireSafeLocal(`routes/${f}`);
      if (r) {
        app.use(mount, r);
        console.log(`+ Route caricata: ${mount} -> routes/${f}`);
        appendLog(`[ROUTE] caricato ${mount}`);
      }
    } catch (e) {
      console.warn(`(WARN) errore caricando routes/${f}: ${e.message}`);
    }
  });
} else {
  console.log('(INFO) Nessuna cartella routes/ trovata — saltata auto-load.');
}

// --- COMANDI: endpoint usato dalla console (compatibile con il tuo client) ---
app.post('/comandi', (req, res) => {
  const comando = (req.body.command || '').toString().trim().toUpperCase();
  appendLog(`[COMANDO RICEVUTO] ${comando} @ ${new Date().toISOString()}`);
  let risposta = '';

  switch (comando) {
    case 'PING':
      risposta = '✅ Genesis è vivo e pronto.';
      break;
    case 'INVIA_50':
      risposta = '🚀 Ordine ricevuto: Invio 50€ (simulato).';
      break;
    case 'INVIA_20000':
      risposta = '🚀 Ordine ricevuto: Invio 20.000€ (simulato).';
      break;
    case 'ATTIVA_COUPON':
      risposta = '🎟️ Attivazione coupon avviata (simulato).';
      break;
    default:
      risposta = `❓ Comando sconosciuto: ${comando}`;
  }

  // log e risposta
  appendLog(`[COMANDO] ${comando} -> ${risposta}`);
  res.send(risposta);
});

// --- endpoint universale /command (compatibilità con vecchi client) ---
app.post('/command', (req, res) => {
  const command = req.body.command || req.body.type || 'unknown';
  appendLog(`[UNIV-COMMAND] ${command} ${JSON.stringify(req.body.data||'')} `);
  res.json({ status: 'ok', message: `Comando "${command}" ricevuto` });
});

// --- ping + ui root ---
app.get('/ping', (req, res) => res.send('✅ Genesis è attivo e ti ascolta, Comandante.'));
app.get('/', (req, res) => {
  // se c'è console.html nella public la serve, altrimenti lista file
  const consoleFile = path.join(__dirname, 'public', 'console.html');
  if (fs.existsSync(consoleFile)) return res.sendFile(consoleFile);
  res.send(`<html><body><h3>Genesis Console</h3><p>Visit /public/console.html</p></body></html>`);
});

// --- global error handler ---
app.use((err, req, res, next) => {
  console.error('🔥 Errore interno:', err && err.stack ? err.stack : err);
  appendLog(`[ERRORE] ${err && err.message ? err.message : JSON.stringify(err)}`);
  res.status(500).send('Errore interno del server Genesis.');
});

// --- prova a caricare moduli /modules (se esistono) ma non crashare se mancano ---
const modulesDir = path.join(__dirname, 'modules');
if (fs.existsSync(modulesDir)) {
  fs.readdirSync(modulesDir).forEach(f => {
    if (!f.endsWith('.js')) return;
    try {
      requireSafeLocal(`modules/${f}`);
      console.log(`+ Modulo caricato (modules/${f})`);
    } catch (e) {
      console.warn(`(WARN) errore loading module ${f}: ${e.message}`);
    }
  });
} else {
  console.log('(INFO) Nessuna cartella modules/ trovata — skip modules load.');
}

// --- start server ---
const PORT = process.env.PORT || 3131;
app.listen(PORT, () => {
  console.log(`🚀 Genesis è online sulla porta ${PORT}`);
  appendLog(`🟢 Genesis Console LIVE sulla porta ${PORT}`);
});
