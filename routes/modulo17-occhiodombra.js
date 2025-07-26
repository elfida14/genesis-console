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
    // simulazione decrypt (in realtà criptato con chiave 313)
    return `[DECR] ${stringa}`;
}

module.exports = ShadowEye;
