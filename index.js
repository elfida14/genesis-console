const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3130;

// 📁 Logging su file logs/tlgs.log
const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'tlgs.log'), { flags: 'a' });

// 🌐 Middleware base
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🛡️ Sicurezza – Solo tu (x-user: Baki)
app.use((req, res, next) => {
  const utente = req.headers['x-user'] || 'sconosciuto';
  const messaggio = `🔐 Richiesta da: ${utente} | ${req.method} ${req.url}`;
  console.log(messaggio);
  logStream.write(`[LOG] ${new Date().toISOString()} - ${messaggio}\n`);

  // Accesso riservato a Baki
  if (req.url !== '/' && utente !== 'Baki') {
    return res.status(403).json({ errore: 'Accesso negato - Utente non autorizzato' });
  }

  next();
});

// 📦 Rotte principali
const attaccoRoutes = require('./routes/attacco');
const comandiRoutes = require('./routes/comandi');
const connessioniRoutes = require('./routes/connessioni');
const difesaRoutes = require('./routes/difesa');
const fondiRoutes = require('./routes/fondi');
const genesisRoutes = require('./routes/genesis');
const modulo7Routes = require('./routes/modulo7');
const modulo8Routes = require('./routes/modulo8');
const modulo9Routes = require('./routes/modulo9');
const modulo10Routes = require('./routes/modulo10');
const modulo11Routes = require('./routes/modulo11-difesa');
const modulo12Routes = require('./routes/modulo12-attacco');
const modulo13Routes = require('./routes/modulo13-specchio');
const modulo15Routes = require('./routes/modulo15-coreIgnis');
const modulo16Routes = require('./routes/modulo16-hydromind');
const modulo17Routes = require('./routes/modulo17-occhiodombra');
const profiloRoutes = require('./routes/profilo');
const roadSystemRoutes = require('./routes/roadSystemSynaptic');
const satelliteRoutes = require('./routes/satellite');
const shadowRoutes = require('./routes/shadow');
const teleRoutes = require('./routes/tele');

// 🛰️ Attiva tutte le rotte
app.use('/attacco', attaccoRoutes);
app.use('/comandi', comandiRoutes);
app.use('/connessioni', connessioniRoutes);
app.use('/difesa', difesaRoutes);
app.use('/fondi', fondiRoutes);
app.use('/genesis', genesisRoutes);
app.use('/modulo7', modulo7Routes);
app.use('/modulo8', modulo8Routes);
app.use('/modulo9', modulo9Routes);
app.use('/modulo10', modulo10Routes);
app.use('/modulo11', modulo11Routes);
app.use('/modulo12', modulo12Routes);
app.use('/modulo13', modulo13Routes);
app.use('/modulo15', modulo15Routes);
app.use('/modulo16', modulo16Routes);
app.use('/modulo17', modulo17Routes);
app.use('/profilo', profiloRoutes);
app.use('/road', roadSystemRoutes);
app.use('/satellite', satelliteRoutes);
app.use('/shadow', shadowRoutes);
app.use('/tele', teleRoutes);

// 📄 Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Rotta POST di test da Postman
app.post('/', (req, res) => {
  const utente = req.body.utente || 'nessuno';
  const messaggio = `📩 POST ricevuto da: ${utente}`;
  console.log(messaggio);
  logStream.write(`[POST] ${new Date().toISOString()} - ${messaggio}\n`);
  res.json({ messaggio: `Ciao ${utente}, il server è vivo e risponde! 🚀` });
});

// 🎮 Rotta della CONSOLE – Comandi in tempo reale
app.post('/command', (req, res) => {
  const { type, data } = req.body;

  // Risposta simulata (qui puoi attaccare la vera LAI quando vuoi)
  const risposta = {
    type: 'GENESIS',
    data: `📡 Comando ricevuto: "${data}" - elaborato da LAI 🧠`,
  };

  logStream.write(`[COMMAND] ${new Date().toISOString()} - ${JSON.stringify(req.body)}\n`);
  res.json(risposta);
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🛰️ GENESIS 313 online su porta ${PORT}`);
  logStream.write(`[START] ${new Date().toISOString()} - Server avviato su porta ${PORT}\n`);
});
