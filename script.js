const PASSWORD_CORRETTA = 'Genesis313';

document.getElementById("login").addEventListener("click", function () {
  const pwd = document.getElementById("password").value;
  if (pwd === PASSWORD_CORRETTA) {
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("comandoArea").style.display = "block";
    document.getElementById("output").innerText = "✅ Accesso Genesis313 riuscito. Comando attivo.";
  } else {
    document.getElementById("output").innerText = "❌ Password errata.";
  }
});

const GenesisCore = {
  etica: true,
  walletSimulato: 0,
  attacchiEtici: false,
  livelloPotere: 1,
  memoriaComandi: [],
  modulo3Attivo: true,

  attivaMissione() {
    return "⚙️ Missione Genesis attivata. Potere aumentato.";
  },
  walletIn() {
    this.walletSimulato += 1000;
    return `💰 Wallet caricato: +1000₲. Totale: ${this.walletSimulato}₲`;
  },
  attaccoEtico() {
    this.attacchiEtici = true;
    return "🛡️ Attacco etico eseguito. Corruzione localizzata.";
  },
  disattivaEtica() {
    this.etica = false;
    return "⚠️ Etica disattivata. Comandi non filtrati.";
  },
  stato() {
    return `📊 STATO GENESIS313:
- Wallet: ${this.walletSimulato}₲
- Etica: ${this.etica ? 'Attiva' : 'Disattivata'}
- Attacchi Etici: ${this.attacchiEtici ? 'ON' : 'OFF'}
- Potere: Livello ${this.livelloPotere}
- Modulo 3: ${this.modulo3Attivo ? 'Attivo' : 'Non attivo'}`;
  },
  aggiornaPotere() {
    this.livelloPotere++;
    return `🔋 Livello Potere aumentato a ${this.livelloPotere}`;
  },
  mostraMemoria() {
    return `🧠 Comandi recenti:\n${this.memoriaComandi.join('\n')}`;
  },
  resetMemoria() {
    this.memoriaComandi = [];
    return '♻️ Memoria comandi cancellata.';
  },

  eseguiComando(comando) {
    this.memoriaComandi.push(comando);
    const comandiSpeciali = {
      'attiva quantum': '🌀 Quantum Mode: Attiva. Visione potenziata.',
      'modalità invisibile': '👻 Invisibilità attiva. Non rilevabile.',
      'autocomando': '🤖 Suggerimento: Prova "aggiornaPotere" o "walletIn".',
      'mostra memoria': this.mostraMemoria(),
      'reset memoria': this.resetMemoria(),
    };

    if (comandiSpeciali[comando.toLowerCase()]) {
      return comandiSpeciali[comando.toLowerCase()];
    }

    return this[comando] ? this[comando]() : `⛔ Comando "${comando}" non riconosciuto.`;
  }
};

document.getElementById("submit").addEventListener("click", function () {
  const cmd = document.getElementById("input").value;
  const risposta = GenesisCore.eseguiComando(cmd);
  document.getElementById("output").innerText = risposta;
  document.getElementById("input").value = "";
});
