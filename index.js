const express = require('express');
const path = require('path');
const app = express();
const PORT = 3130;

// 🌐 Middleware globale
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🛡️ Middleware Sicurezza & Logging
app.use((req, res, next) => {
  const utente = req.headers['x-user'] || 'sconosciuto';
  console.log(`🔐 Richiesta da: ${utente} | ${req.method} ${req.url}`);
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
const genesiRoutes = require('./routes/genesi');
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
app.use('/genesi', genesiRoutes);
app.use('/satellite', satelliteRoutes);
app.use('/tele', teleRoutes);
app.use('/connessioni', connessioniRoutes);
app.use('/comandi', comandiRoutes);
app.use('/road', roadSystemSynapticRoutes);
app.use('/shadow', shadowRoutes);
moduli.forEach((modulo, index) => {
  app.use(`/modulo${index + 6}`, modulo);
});

// 📄 Rotta Principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🔊 Avvio Server
app.listen(PORT, () => {
  console.log(`🧬 GENESIS LIVE → http://localhost:${PORT}`);
});
