// Modulo 3 – Potenziamento Intelligente & Modalità Speciali
GenesisCore.memoriaComandi = [];

GenesisCore.nuoviComandi = {
  "attiva quantum": () => {
    GenesisCore.livelloPotere += 3;
    return "⚛️ Modalità Quantum attivata. Potere espanso dimensionalmente.";
  },

  "attiva invisibile": () => {
    return "🕶️ Modalità Invisibile Apertiva ON. Attività mascherata digitalmente.";
  },

  "rivedi memoria": () => {
    if (GenesisCore.memoriaComandi.length === 0) {
      return "🧠 Nessun comando memorizzato.";
    }
    return "📂 Comandi usati:\n- " + GenesisCore.memoriaComandi.join("\n- ");
  },

  "svuota memoria": () => {
    GenesisCore.memoriaComandi = [];
    return "🧹 Memoria comandi svuotata.";
  },

  "auto potenzia": () => {
    GenesisCore.livelloPotere += Math.floor(Math.random() * 5) + 1;
    return `⚡ Auto-potenza attivata. Livello potere attuale: ${GenesisCore.livelloPotere}`;
  }
};

// Sovrascrivo input handler (versione migliorata)
document.getElementById("input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const comando = this.value.trim().toLowerCase();
    const output = document.getElementById("output");

    // Salva il comando
    if (comando !== "") {
      GenesisCore.memoriaComandi.push(comando);
    }

    // Cerca se esiste un comando base
    let risposta = "";
    if (GenesisCore[comando]) {
      risposta = GenesisCore[comando]();
    }
    // Oppure comando nuovo (Modulo 3)
    else if (GenesisCore.nuoviComandi[comando]) {
      risposta = GenesisCore.nuoviComandi[comando]();
    }
    else {
      risposta = `❓ Comando non riconosciuto: ${comando}`;
    }

    output.innerText = `[Genesis313 Console]\n${risposta}`;
    this.value = "";
  }
});
