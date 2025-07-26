// routes/modulo9.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Percorso log
const logPath = path.join(__dirname, '../logs/tlgs.log');

router.post('/modulo9', (req, res) => {
    const input = req.body.messaggio;
    const utente = req.headers['x-user'] || 'Anonimo';

    if (!input) {
        return res.status(400).json({ errore: 'Messaggio mancante nel body' });
    }

    const risposta = generaRispostaEmpatica(input);

    const logEntry = `[Modulo 9 - Empatia][${new Date().toISOString()}][${utente}] ${input} => ${risposta}\n`;
    fs.appendFileSync(logPath, logEntry, 'utf8');

    res.json({
        modulo: 9,
        status: 'ok',
        risposta: risposta,
        messaggioOriginale: input,
    });
});

function generaRispostaEmpatica(testo) {
    const basso = testo.toLowerCase();
    
    if (basso.includes('triste') || basso.includes('male')) {
        return 'Capisco che stai attraversando un momento difficile. Sono qui per ascoltarti.';
    } else if (basso.includes('felice') || basso.includes('bene')) {
        return 'Mi fa molto piacere sentire che stai bene. Continua così.';
    } else if (basso.includes('paura') || basso.includes('ansia')) {
        return 'La paura è umana, ma insieme possiamo affrontarla. Raccontami di più.';
    } else {
        return 'Ti ascolto. Dimmi tutto quello che vuoi esprimere.';
    }
}

module.exports = router;
