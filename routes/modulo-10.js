// routes/modulo10.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../logs/tlgs.log');

router.post('/modulo10', (req, res) => {
    const comando = req.body.comando;
    const utente = req.headers['x-user'] || 'Anonimo';

    if (!comando) {
        return res.status(400).json({ errore: 'Comando mancante nel body' });
    }

    const visione = interpretaComando(comando);

    const logEntry = `[Modulo 10 - Azione][${new Date().toISOString()}][${utente}] ${comando} => ${visione}\n`;
    fs.appendFileSync(logPath, logEntry, 'utf8');

    res.json({
        modulo: 10,
        status: 'ok',
        comando: comando,
        visioneGenerata: visione
    });
});

function interpretaComando(testuale) {
    const comando = testuale.toLowerCase();

    if (comando.includes('aiutare')) {
        return 'La vera forza è nel tendere la mano: inizia ascoltando chi ti è vicino.';
    } else if (comando.includes('messaggio')) {
        return 'Scrivi un messaggio per il mondo. Fallo con il cuore, e lascialo andare come luce.';
    } else if (comando.includes('proteggere') || comando.includes('difendere')) {
        return 'Sii scudo per chi non ha voce. L’azione giusta nasce dalla coscienza pulita.';
    } else {
        return 'Ogni comando è un seme: coltivalo con rispetto e nascerà una missione.';
    }
}

module.exports = router;
