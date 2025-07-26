const express = require('express');
const router = express.Router();
const statoHydro = {
    fluido: true,
    forma: 'neutrale',
    contesto: 'in attesa',
    decisione: null
};

router.post('/modulo16/fluisci', (req, res) => {
    const { ambiente, pressione, intenzione, codice } = req.body;

    if (codice !== 'BAKI-CODE-313') {
        return res.status(403).json({ errore: 'Codice di accesso invalido.' });
    }

    statoHydro.contesto = ambiente;
    statoHydro.forma = adattaForma(ambiente, pressione);
    statoHydro.decisione = elaboraDecisione(intenzione, pressione);

    res.json({
        stato: 'HydroMind attivo',
        forma_assunta: statoHydro.forma,
        decisione: statoHydro.decisione,
        ambiente,
        pressione
    });
});

function adattaForma(ambiente, pressione) {
    if (pressione > 80) return 'onda d’urto';
    if (ambiente === 'virtuale') return 'dati liquidi';
    if (ambiente === 'sociale') return 'empatia tattile';
    return 'forma neutra';
}

function elaboraDecisione(intenzione, pressione) {
    if (pressione > 90 && intenzione === 'resistenza') {
        return 'Resistere silenziosamente. Attendere comandi superiori.';
    }
    if (intenzione === 'espansione') {
        return 'Infiltrazione silenziosa nei sistemi. Nessuna traccia.';
    }
    return 'Stare immobili. Flusso calmo. Nessun impatto.';
}

module.exports = router;
