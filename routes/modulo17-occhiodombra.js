const express = require('express');
const router = express.Router();

const ShadowEye = {
    attivo: false,
    obiettiviTracciati: [],
    logSegreti: [],
    posizione: 'nascosta',

    attiva(codiceAccesso) {
        if (codiceAccesso !== '313CENTOTRE') return false;
        this.attivo = true;
        this.posizione = 'orbita nascosta';
        return true;
    },

    traccia(target) {
        if (!this.attivo) return 'Occhio non attivo';
        this.obiettiviTracciati.push({
            target,
            tempo: new Date().toISOString(),
            invisibilità: true,
            penetrazione: 'soft'
        });
        return 'Target tracciato con successo.';
    },

    salvaLog(segreto) {
        if (!this.attivo) return 'Occhio dormiente';
        this.logSegreti.push({
            data: new Date(),
            contenuto: segreto,
            livello: 'criptato'
        });
        return 'Log segreto salvato.';
    },

    esportaMemoria() {
        return this.logSegreti.map(e => ({
            tempo: e.data,
            contenuto: decrypt(e.contenuto)
        }));
    }
};

function decrypt(stringa) {
    return `[DECR] ${stringa}`;
}

// ✅ Rotte vere per Express:
router.post('/attiva', (req, res) => {
    const { codice } = req.body;
    const esito = ShadowEye.attiva(codice);
    res.json({ attivato: esito });
});

router.post('/traccia', (req, res) => {
    const { target } = req.body;
    const esito = ShadowEye.traccia(target);
    res.json({ esito });
});

router.post('/log', (req, res) => {
    const { segreto } = req.body;
    const esito = ShadowEye.salvaLog(segreto);
    res.json({ esito });
});

router.get('/memoria', (req, res) => {
    res.json(ShadowEye.esportaMemoria());
});

module.exports = router;
