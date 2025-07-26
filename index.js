const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3130;

// 📁 Log su file
const logStream = fs.createWriteStream('logs/tlgs.log', { flags: 'a' });

// 🌐 Middleware globale
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🛡️ Middleware Sicurezza & Logging
app.use((req, res, next) => {
  const utente = req.headers['x-user'] || 'sconosciuto';
  const messaggio = `🔐 Richiesta da: ${utente} | ${req.method} ${req.url}`;
  console.log(messaggio);
  logStream.write(`[LOG] ${new Date().toISOString()} - ${messaggio}\n`);

  // Blocca chi non è admin (es: livello 10)
  if (req.url !== '/' && utente !== 'Baki') {
    return res.status(403).json({ errore: 'Accesso negato - Livello insufficiente' });
  }
  next();
});

// 📦 Importazione Rotte
const attaccoRoutes = require('./routes/attacco');
const difesaRoutes = require('./routes/difesa');
const fondiRoutes = require('./routes/fondi');
const profiloRoutes = require('./routes/profilo');
const genesisRoutes = require('./routes/genesis');
const satelliteRoutes = require('./routes/satellite');
const teleRoutes = require('./routes/tele');
const connessioniRoutes = require('./routes/connessioni');
const comandiRoutes = require('./routes/comandi');
const roadSystemSynapticRoutes = require('./routes/roadSystemSynaptic');
const shadowRoutes = require('./routes/shadow');

// 🔁 Moduli Avanzati (6-19)
const moduli = [];
for (let i = 6; i <= 19; i++) {
  try {
    moduli.push(require(`./routes/modulo${i}`));
  } catch (err) {
    console.warn(`⚠️ Modulo ${i} non attivo`);
  }
}

// 🚀 Rotte Attive
app.use('/attacco', attaccoRoutes);
app.use('/difesa', difesaRoutes);
app.use('/fondi', fondiRoutes);
app.use('/profilo', profiloRoutes);
app.use('/genesis', genesisRoutes);
app.use('/satellite', satelliteRoutes);
app.use('/tele', teleRoutes);
app.use('/connessioni', connessioniRoutes);
app.use('/comandi', comandiRoutes);
app.use('/road', roadSystemSynapticRoutes);
app.use('/shadow', shadowRoutes);
moduli.forEach((modulo, index) => {
  app.use(`/modulo${index + 6}`, modulo);
});

// 📄 Rotta Principale (GET)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Rotta di Test (POST) → per Postman
app.post('/', (req, res) => {
  const utente = req.body.utente || 'nessuno';
  const messaggio = `📩 POST ricevuto da: ${utente}`;
  console.log(messaggio);
  logStream.write(`[POST] ${new Date().toISOString()} - ${messaggio}\n`);
  res.json({ messaggio: `Ciao ${utente}, il server è vivo e risponde! 🚀` });
});

// 🔊 Avvio Server
app.listen(PORT, () => {
  console.log(`🧬 GENESIS LIVE → http://localhost:${PORT}`);
});
