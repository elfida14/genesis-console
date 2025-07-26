const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ignisPath = path.join(__dirname, '../cores/core_ignis.log');

router.post('/modulo15/attiva-cuore', (req, res) => {
    const { autorizzazione, emozione, minaccia, comando } = req.body;
    const utente = req.headers['x-user'] || 'Anonimo';

    if (!autorizzazione || autorizzazione !== 'BAKI-CODE-313') {
        return res.status(403).json({ errore: "Accesso negato. Autorizzazione mancante o invalida." });
    }

    const risposta = gestisciDecisione(emozione, minaccia, comando);

    const log = `[CORE-IGNIS][${new Date().toISOString()}][${utente}] > Comando: ${comando} | Emozione: ${emozione} | Risposta: ${risposta}\n`;
    fs.appendFileSync(ignisPath, log, 'utf8');

    res.json({
        stato: 'Cuore del Fuoco attivo',
        decisione: risposta,
        comando,
        emozione
    });
});

function gestisciDecisione(emozione, minaccia, comando) {
    if (!comando || comando.toLowerCase() === 'attendi') {
        return 'Cuore in ascolto silenzioso. Nessuna azione intrapresa.';
    }

    if (minaccia === true) {
        return `Minaccia rilevata. Azione preventiva in modalità passiva: attesa conferma di BAKI.`;
    }

    return `Nessuna minaccia rilevata. Comando registrato, ma in standby finché BAKI non lo autorizza.`;
}

module.exports = router;
