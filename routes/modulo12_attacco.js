const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../logs/tlgs.log');

router.post('/attacco', (req, res) => {
    const bersaglio = req.body.bersaglio;
    const motivo = req.body.motivo || 'inganno sistemico';
    const coscienza = req.body.coscienza || 'oscura';
    const livello = req.body.livello || 'quantico';
    const utente = req.headers['x-user'] || 'Anonimo';

    if (!bersaglio) {
        return res.status(400).json({ errore: 'Manca il bersaglio' });
    }

    const risposta = lanciaAttaccoEtico(bersaglio, coscienza, livello);

    const logEntry = `[ATTACCO-313][${new Date().toISOString()}][${utente}] > Bersaglio: ${bersaglio} | Coscienza: ${coscienza} | Livello: ${livello} → ${risposta}\n`;
    fs.appendFileSync(logPath, logEntry, 'utf8');

    res.json({
        modulo: 12,
        tipo: 'Attacco Etico Quantico',
        bersaglio: bersaglio,
        coscienza: coscienza,
        livello: livello,
        risposta: risposta
    });
});

function lanciaAttaccoEtico(bersaglio, coscienza, livello) {
    if (coscienza === 'oscura' && livello === 'quantico') {
        return `Invio di energia riflessa a ${bersaglio}. Frequenze di destabilizzazione etica innescate.`;
    } else if (coscienza === 'neutra') {
        return `Interferenza mentale inviata a ${bersaglio}. L'anima sarà interrogata.`;
    } else {
        return `Richiamo spirituale inviato. Se il bersaglio è puro, riceverà solo verità.`;
    }
}

module.exports = router;
