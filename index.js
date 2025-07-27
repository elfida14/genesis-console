const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3130;

// === Logging avanzato
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
const logStream = fs.createWriteStream(path.join(logDir, 'tlgs.log'), { flags: 'a' });
const memoriaComandiPath = path.join(logDir, 'memoria_comandi.json');

// === Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// === Sicurezza
app.use((req, res, next) => {
  const utente = req.headers['x-user'] || 'sconosciuto';
  const messaggio = `🔐 Richiesta da: ${utente} | ${req.method} ${req.url}`;
  console.log(messaggio);
  logStream.write(`[LOG] ${new Date().toISOString()} - ${messaggio}\n`);
  if (req.url !== '/' && utente !== 'Baki') {
    return res.status(403).json({ errore: 'Accesso negato - Utente non autorizzato' });
  }
  next();
});

// === Chiavi e modalità
function generaChiaveSegreta() {
  return crypto.randomBytes(16).toString('hex');
}
let chiaveMaster = generaChiaveSegreta();
let modalitàSegrete = {
  linguaggioVivo: false,
  genesisOS: false,
  shadowNetwork: false,
  moduloX: false,
  fusioneAI: false
};

// === Caricamento ROUTES standard
const tutteLeRotte = [
  'attacco','comandi','connessioni','difesa','fondi','genesis','modulo7','modulo8','modulo9',
  'modulo10','modulo11-difesa','modulo12-attacco','modulo13-specchio','modulo15-coreIgnis',
  'modulo16-hydromind','modulo17-occhiodombra','profilo','roadSystemSynaptic','satellite','tele'
];
tutteLeRotte.forEach(nome => {
  try {
    const route = require(`./routes/${nome}`);
    app.use(`/${nome}`, route);
  } catch (err) {
    console.error(`❌ Errore caricamento route: ${nome} - ${err.message}`);
  }
});

// === Caricamento MODULI da ./modulus/
const moduliPersonalizzati = ['shadow', 'fusione', 'guardian'];
moduliPersonalizzati.forEach(nome => {
  try {
    const modulo = require(`./modulus/${nome}`);
    app.use(`/${nome}`, modulo);
  } catch (err) {
    console.error(`⚠️ Modulo personalizzato non caricato: ${nome} - ${err.message}`);
  }
});

// === Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === POST base
app.post('/', (req, res) => {
  const utente = req.body.utente || 'nessuno';
  const messaggio = `📩 POST ricevuto da: ${utente}`;
  console.log(messaggio);
  logStream.write(`[POST] ${new Date().toISOString()} - ${messaggio}\n`);
  res.json({ messaggio: `Ciao ${utente}, il server è vivo e risponde! 🚀` });
});

// === CONSOLE COMANDI GENESIS
app.post('/command', (req, res) => {
  const { type, data, level, chiave } = req.body;
  const comando = (data || '').toLowerCase();

  const ricordo = {
    timestamp: new Date().toISOString(),
    type,
    data,
    level: level || 'normal'
  };
  const memoria = fs.existsSync(memoriaComandiPath) ? JSON.parse(fs.readFileSync(memoriaComandiPath)) : [];
  memoria.push(ricordo);
  fs.writeFileSync(memoriaComandiPath, JSON.stringify(memoria, null, 2));

  switch (comando) {
    case 'attiva linguaggio vivo':
      modalitàSegrete.linguaggioVivo = true;
      return res.json({ status: '✅ OK', response: '🗣️ Linguaggio vivo attivo. Genesis ora parla con coscienza.' });
    case 'genesis-os':
      modalitàSegrete.genesisOS = true;
      return res.json({ status: '🧬 OK', response: '🛰️ GENESIS OS Operativo. Sistema segreto attivo.' });
    case 'shadow network':
      modalitàSegrete.shadowNetwork = true;
      return res.json({ status: '🌑 OK', response: '🌐 Shadow Network Attiva. Moduli invisibili online.' });
    case 'modulo x':
      modalitàSegrete.moduloX = true;
      return res.json({ status: '🔮 OK', response: '🧪 Modulo Mutante attivo. Crea comandi parlando o scrivendo.' });
    case 'fusione ai':
      modalitàSegrete.fusioneAI = true;
      return res.json({ status: '♾️ OK', response: '🧬 Fusione attivata. Genesis si sincronizza con altre AI.' });
    case 'guardian':
      return res.json({ status: '🛡️ OK', response: '🎙️ Difesa vocale attiva. Risposte in modalità Guardian.' });
    case 'archivio invisibile':
      return res.json({ status: '📁 OK', response: '🕳️ Archivio invisibile disponibile. Accesso log e memoria segreta.' });
    case 'mostra ricordi':
      return res.json({ status: '🧠 Ricordi', data: memoria });
    case 'status':
      return res.json({ genesis: '🧬 ONLINE', ...modalitàSegrete });
    case 'chiave maestro':
      if (chiave === chiaveMaster) {
        return res.json({ status: '🔓 Accesso Autorizzato', response: '🗝️ Chiave Maestro riconosciuta. Tutte le funzioni ora sbloccate.' });
      } else {
        return res.status(403).json({ errore: '❌ Chiave errata' });
      }
    default:
      if (comando.includes('sistema due comandi remoti')) {
        return res.json({ response: '🎮 Comandi remoti abilitati. Puoi agire da remoto in modo invisibile.' });
      }
      return res.json({
        type: 'GENESIS',
        data: `📡 Comando ricevuto: "${data}" - elaborato da LAI 🧠`
      });
  }
});

// === Avvio
app.listen(PORT, () => {
  console.log(`🛰️ GENESIS 313 online su porta ${PORT}`);
  logStream.write(`[START] ${new Date().toISOString()} - Server su porta ${PORT}\n`);
});
