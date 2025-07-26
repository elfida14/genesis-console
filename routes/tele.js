const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, '../logs/tlgs.log');

// Stato avanzato del modulo TLGS
let tlgsState = {
  active: true,
  satellitesOnline: 0,
  telemetryData: [],
  lastUpdate: null,
  alerts: [],
  autoUpdateInterval: 30000, // 30 sec
};

// Funzione per scrivere log su file con timestamp
function logEvent(event) {
  const logEntry = `[${new Date().toISOString()}] ${event}\n`;
  fs.appendFile(LOG_PATH, logEntry, err => {
    if (err) console.error('Errore scrittura log TLGS:', err);
  });
}

// Funzione simulazione update dati telemetry
function generateTelemetry() {
  // Simula dati da più satelliti
  const satCount = Math.floor(Math.random() * 5) + 1;
  let telemetry = [];
  for (let i = 1; i <= satCount; i++) {
    telemetry.push({
      satelliteId: `SAT-${i}`,
      position: {
        lat: (Math.random() * 180 - 90).toFixed(6),
        lon: (Math.random() * 360 - 180).toFixed(6),
        alt: (Math.random() * 2000 + 300).toFixed(2)
      },
      status: ['OK', 'WARNING', 'CRITICAL'][Math.floor(Math.random() * 3)],
      battery: (Math.random() * 100).toFixed(2) + '%',
      signal: (Math.random() * 100).toFixed(2) + '%',
      timestamp: new Date().toISOString()
    });
  }
  return telemetry;
}

// Auto aggiornamento dati in background
setInterval(() => {
  if (!tlgsState.active) return;

  const data = generateTelemetry();
  tlgsState.telemetryData = data;
  tlgsState.satellitesOnline = data.length;
  tlgsState.lastUpdate = new Date().toISOString();

  // Esempio semplice di alert generico
  tlgsState.alerts = data
    .filter(sat => sat.status !== 'OK')
    .map(sat => `⚠️ ${sat.satelliteId} status: ${sat.status}`);

  logEvent(`AutoUpdate: ${tlgsState.satellitesOnline} satellites active; alerts: ${tlgsState.alerts.length}`);
}, tlgsState.autoUpdateInterval);

// Route principale: stato modulo TLGS
router.get('/', (req, res) => {
  res.json({
    modulo: 'TLGS',
    status: tlgsState.active ? '🟢 Online' : '🔴 Offline',
    satellitesOnline: tlgsState.satellitesOnline,
    lastUpdate: tlgsState.lastUpdate,
    alerts: tlgsState.alerts
  });
});

// Route per ottenere dati telemetry attuali
router.get('/telemetry', (req, res) => {
  res.json(tlgsState.telemetryData);
});

// Route per attivare/disattivare modulo TLGS
router.post('/toggle', (req, res) => {
  tlgsState.active = !tlgsState.active;
  logEvent(`Modulo TLGS ${(tlgsState.active) ? 'attivato' : 'disattivato'} manualmente`);
  res.json({ status: tlgsState.active ? 'Attivo' : 'Disattivo' });
});

// Route per forzare update dati telemetry manuale
router.post('/update', (req, res) => {
  if (!tlgsState.active) {
    return res.status(403).json({ errore: 'Modulo TLGS non attivo' });
  }

  const data = generateTelemetry();
  tlgsState.telemetryData = data;
  tlgsState.satellitesOnline = data.length;
  tlgsState.lastUpdate = new Date().toISOString();

  tlgsState.alerts = data
    .filter(sat => sat.status !== 'OK')
    .map(sat => `⚠️ ${sat.satelliteId} status: ${sat.status}`);

  logEvent('Update manuale dati telemetry richiesto');
  res.json({ message: 'Update telemetry eseguito', telemetryCount: data.length });
});

module.exports = router;
