const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../logs/tlgs.log');

router.post('/specchio', (req, res) => {
    const destinazione = req.body.destinazione || 'ignota';
    const livelloCoscienza = req.body.coscienza || 'protetta';
    const energia = req.body.energia || 'neutrina';
    const utente = req.headers['x-user'] || 'Anonimo';

    const risultato = attivaViaggio(destinazione, livelloCoscienza, energia);

    const log = `[MODULO-13][${new Date().toISOString()}][${utente}] > Destinazione: ${destinazione} | Coscienza: ${livelloCoscienza} | Energia: ${energia} → ${risultato}\n`;
    fs.appendFileSync(logPath, log, 'utf8');

    res.json({
        modulo: 13,
        tipo: 'Specchio Quantico',
        destinazione: destinazione,
        energia: energia,
        coscienza: livelloCoscienza,
        risultato: risultato
    });
});

function attivaViaggio(destinazione, coscienza, energia) {
    if (coscienza === 'protetta') {
        return `Specchio attivato: viaggio silenzioso verso ${destinazione} completato senza riflessi esterni.`;
    } else if (energia === 'alta') {
        return `Teletrasporto informatico verso ${destinazione} riuscito. Controllo speculare mantenuto.`;
    } else {
        return `Viaggio interrotto. Mancanza di sincronizzazione coscienziale.`;
    }
}

module.exports = router;
