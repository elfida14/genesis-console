// index.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3130;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importazione delle rotte avanzate
const attaccoRoutes = require('./routes/attacco');
const difesaRoutes = require('./routes/difesa');
const fondiRoutes = require('./routes/fondi');
const profiloRoutes = require('./routes/profilo');
const genesiRoutes = require('./routes/genesi');
const satelliteRoutes = require('./routes/satellite');
const teleRoutes = require('./routes/tele');
const connessioniRoutes = require('./routes/connessioni');
const comandiRoutes = require('./routes/comandi');

// Altri moduli avanzati (6-19)
const moduli = [];
for (let i = 6; i <= 19; i++) {
  try {
    moduli.push(require(`./routes/modulo${i}`));
  } catch (err) {
    console.warn(`Modulo ${i} non ancora attivo`);
  }
}

// Collegamento delle rotte
app.use('/attacco', attaccoRoutes);
app.use('/difesa', difesaRoutes);
app.use('/fondi', fondiRoutes);
app.use('/profilo', profiloRoutes);
app.use('/genesi', genesiRoutes);
app.use('/satellite', satelliteRoutes);
app.use('/tele', teleRoutes);
app.use('/connessioni', connessioniRoutes);
app.use('/comandi', comandiRoutes);
moduli.forEach((modulo, index) => {
  app.use(`/modulo${index + 6}`, modulo);
});

// Rotta principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`🌐 Genesis attivo su http://localhost:${PORT}`);
});
