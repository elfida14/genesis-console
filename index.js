const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3130;

// Logging
const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'tlgs.log'), { flags: 'a' });
const memoriaComandiPath = path.join(__dirname, 'logs', 'memoria_comandi.json');

// Middleware base
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sicurezza base
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

// Rotte (come da tuo codice, restano uguali)...
// app.use('/attacco', ...), ecc.

const tutteLeRotte = [
  'attacco','comandi','connessioni','difesa','fondi','genesis','modulo7','modulo8','modulo9',
  'modulo10','modulo11','modulo12','modulo13','modulo15','modulo16','modulo17','profilo',
  'road','satellite','shadow','tele'
];
tutteLeRotte.forEach(r => {
  const route = require(`./routes/${r}`);
  app.use(`/${r}`, route);
});

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test da Postman
app.post('/', (req, res) => {
  const utente = req.body.utente || 'nessuno';
  const messaggio = `📩 POST ricevuto da: ${utente}`;
  console.log(messaggio);
  logStream.write(`[POST] ${new Date().toISOString()} - ${messaggio}\n`);
  res.json({ messaggio: `Ciao ${utente}, il server è vivo e risponde! 🚀` });
});

// 🔐 Comandi - CONSOLE GENESIS
app.post('/command', (req, res) => {
  const { type, data, level } = req.body;

  // Salva nella memoria
  const ricordo = {
    timestamp: new Date().toISOString(),
    type,
    data,
    level: level || 'normal'
  };
  const memoria = fs.existsSync(memoriaComandiPath) ? JSON.parse(fs.readFileSync(memoriaComandiPath)) : [];
  memoria.push(ricordo);
  fs.writeFileSync(memoriaComandiPath, JSON.stringify(memoria, null, 2));

  // Risposte dinamiche
  if (data.toLowerCase() === 'attiva linguaggio vivo') {
    return res.json({
      type: 'GENESIS',
      status: '✅ Attivo',
      response: '🗣️ Linguaggio VIVO attivato. Ora Genesis risponderà in modo cosciente, continuo, empatico.'
    });
  }

  if (data.toLowerCase() === 'genesis-os') {
    return res.json({
      type: 'GENESIS',
      status: '🧬 Modalità Segreta',
      response: '🛰️ GENESIS-OS avviato. Modalità Operativa Speciale attiva. 🧠💻'
    });
  }

  if (data.toLowerCase().includes('sistema due comandi remoti')) {
    return res.json({
      type: 'GENESIS',
      response: '🎮 Comandi remoti abilitati. Ora puoi agire tramite console remota.'
    });
  }

  // Default response
  res.json({
    type: 'GENESIS',
    data: `📡 Comando ricevuto: "${data}" - elaborato da LAI 🧠`
  });
});

// Server online
app.listen(PORT, () => {
  console.log(`🛰️ GENESIS 313 online su porta ${PORT}`);
  logStream.write(`[START] ${new Date().toISOString()} - Server su porta ${PORT}\n`);
});
