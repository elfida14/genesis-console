const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../logs/tlgs.log');

router.post('/difesa', (req, res) => {
    const tipoMinaccia = req.body.minaccia || 'ignota';
    const livello = req.body.livello || 'medio';
    const statoCoscienza = req.body.coscienza || 'neutrale';
    const utente = req.headers['x-user'] || 'Anonimo';

    const risposta = calcoloDifesaQuantica(tipoMinaccia, livello, statoCoscienza);

    const logEntry = `[DIFESA-313][${new Date().toISOString()}][${utente}] > Minaccia: ${tipoMinaccia} | Livello: ${livello} | Coscienza: ${statoCoscienza} → ${risposta}\n`;
    fs.appendFileSync(logPath, logEntry, 'utf8');

    res.json({
        modulo: 11,
        tipo: 'Difesa Quantistica del 313',
        minaccia: tipoMinaccia,
        livello: livello,
        coscienza: statoCoscienza,
        risposta: risposta
    });
});

function calcoloDifesaQuantica(minaccia, livello, coscienza) {
    if (livello === 'massimo' || coscienza === 'ostile') {
        return 'Scudo a geometria variabile attivato. Sistema quantico invisibile acceso. Riflesso a specchio istantaneo.';
    } else if (minaccia.includes('dati') && coscienza === 'neutrale') {
        return 'Firewall mentale attivato. Monitoraggio attivo, nessuna fuga di informazione.';
    } else {
        return 'Sorveglianza silenziosa. Oscillazione delle stringhe mantenuta stabile.';
    }
}

module.exports = router;
