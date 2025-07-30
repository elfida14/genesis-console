// server.js – Genesis Entry Point
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3130;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Logging
const log = (msg) => {
    const logMessage = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync('./logs/tlgs.log', logMessage);
    console.log(logMessage);
};

// ROOT
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ROUTES
const routes = [
    'fondi',
    'genesis',
    'comandi',
    'profilo',
    'activation-lock',
    'genesis-broadcast',
    'impact-router',
    'attacco',
    'difesa',
    'connessioni',
    'modulo7',
    'modulo8',
    'modulo9',
    'modulo10',
    'modulo11-difesa',
    'modulo12-attacco',
    'modulo13-specchio',
    'modulo15-coreIgnis',
    'modulo16-hydromind',
    'modulo17-occhiodombra',
    'tele',
    'satellite',
    'roadSystemSynaptic'
];

routes.forEach((route) => {
    const routePath = path.join(__dirname, 'routes', `${route}.js`);
    if (fs.existsSync(routePath)) {
        app.use(`/api/${route}`, require(routePath));
        log(`Route /api/${route} loaded.`);
    } else {
        log(`Route /api/${route} missing.`);
    }
});

// START SERVER
app.listen(PORT, () => {
    log(`🚀 GENESIS Console attiva su PORT ${PORT}`);
});
