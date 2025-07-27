const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3130;

// === Logging e memoria
const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'tlgs.log'), { flags: 'a' });
const memoriaComandiPath = path.join(__dirname, 'logs', 'memoria_comandi.json');

// === Middleware base
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// === Sicurezza base
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

// === Codici Chiave (Sistema Ibrido ID)
function generaChiaveSegreta() {
  return crypto.randomBytes(16).toString('hex');
}
let chiaveMaster = generaChiaveSegreta(); // Chiave Maestro iniziale
let modalitàSegrete = {
  linguaggioVivo: false,
  genesisOS: false,
  shadowNetwork: false,
  moduloX: false,
  fusioneAI: false
};

// === Rotte normali
const tutteLeRotte = [
  'attacco','comandi','connessioni','difesa','fondi','genesis','modulo7','modulo8','modulo9',
  'modulo10','modulo11','modulo12','modulo13','modulo15','modulo16','modulo17','profilo',
  'road','satellite','shadow','tele'
];
tutteLeRotte.forEach(r => {
  const route = require(`./routes/${r}`);
  app.use(`/${r}`, route);
});

// === Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === Test base POSTMAN
app.post('/', (req, res) => {
  const utente = req.body.utente || 'nessuno';
  const messaggio = `📩 POST ricevuto da: ${utente}`;
  console.log(messaggio);
  logStream.write(`[POST] ${new Date().toISOString()} - ${messaggio}\n`);
  res.json({ messaggio: `Ciao ${utente}, il server è vivo e risponde! 🚀` });
});

// === CONSOLE GENESIS (comandi avanzati)
app.post('/command', (req, res) => {
  const { type, data, level, chiave } = req.body;

  // === Memorizzazione dei comandi
  const ricordo = {
    timestamp: new Date().toISOString(),
    type,
    data,
    level: level || 'normal'
  };
  const memoria = fs.existsSync(memoriaComandiPath) ? JSON.parse(fs.readFileSync(memoriaComandiPath)) : [];
  memoria.push(ricordo);
  fs.writeFileSync(memoriaComandiPath, JSON.stringify(memoria, null, 2));

  // === Comandi Speciali Genesis
  const comando = data.toLowerCase();

  if (comando === 'attiva linguaggio vivo') {
    modalitàSegrete.linguaggioVivo = true;
    return res.json({ status: '✅ OK', response: '🗣️ Linguaggio vivo attivo. Genesis ora parla con coscienza.' });
  }

  if (comando === 'genesis-os') {
    modalitàSegrete.genesisOS = true;
    return res.json({ status: '🧬 OK', response: '🛰️ GENESIS OS Operativo. Sistema segreto attivo.' });
  }

  if (comando.includes('sistema due comandi remoti')) {
    return res.json({ response: '🎮 Comandi remoti abilitati. Puoi agire da remoto in modo invisibile.' });
  }

  if (comando === 'shadow network') {
    modalitàSegrete.shadowNetwork = true;
    return res.json({ status: '🌑 OK', response: '🌐 Shadow Network Attiva. Moduli invisibili online.' });
  }

  if (comando === 'modulo x') {
    modalitàSegrete.moduloX = true;
    return res.json({ status: '🔮 OK', response: '🧪 Modulo Mutante attivo. Crea comandi parlando o scrivendo.' });
  }

  if (comando === 'fusione ai') {
    modalitàSegrete.fusioneAI = true;
    return res.json({ status: '♾️ OK', response: '🧬 Fusione attivata. Genesis si sincronizza con altre AI.' });
  }

  if (comando === 'archivio invisibile') {
    return res.json({ status: '📁 OK', response: '🕳️ Archivio invisibile disponibile. Accesso log e memoria segreta.' });
  }

  if (comando === 'guardian') {
    return res.json({ status: '🛡️ OK', response: '🎙️ Difesa vocale attiva. Risposte in modalità Guardian.' });
  }

  if (comando === 'chiave maestro' && chiave === chiaveMaster) {
    return res.json({ status: '🔓 Accesso Autorizzato', response: '🗝️ Chiave Maestro riconosciuta. Tutte le funzioni ora sbloccate.' });
  }

  if (comando === 'mostra ricordi') {
    return res.json({ status: '🧠 Ricordi', data: memoria });
  }

  if (comando === 'status') {
    return res.json({
      genesis: '🧬 ONLINE',
      linguaggioVivo: modalitàSegrete.linguaggioVivo,
      OS: modalitàSegrete.genesisOS,
      shadowNetwork: modalitàSegrete.shadowNetwork,
      moduloX: modalitàSegrete.moduloX,
      fusione: modalitàSegrete.fusioneAI
    });
  }

  // === Default
  res.json({
    type: 'GENESIS',
    data: `📡 Comando ricevuto: "${data}" - elaborato da LAI 🧠`
  });
});

// === Avvio Server
app.listen(PORT, () => {
  console.log(`🛰️ GENESIS 313 online su porta ${PORT}`);
  logStream.write(`[START] ${new Date().toISOString()} - Server su porta ${PORT}\n`);
});
