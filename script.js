const consoleBox = document.getElementById("console");
const input = document.getElementById("commandInput");

function logConsole(msg) {
  consoleBox.innerHTML += `<br>> ${msg}`;
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

function eseguiComando() {
  const cmd = input.value.trim().toLowerCase();
  input.value = "";

  // Comandi riconosciuti
  switch (cmd) {
    case `accesso("genesis313")`:
      logConsole("Accesso riuscito. Benvenuto, Operatore 313.");
      break;
    case `attiva("quantum")`:
      logConsole("🌀 Modalità Quantum attivata.");
      break;
    case `attiva("invisibile")`:
      logConsole("🕶️ Modalità Invisibile apertiva attiva.");
      break;
    case `comando("effetto")`:
      logConsole("✨ Effetto attivo. Ambiente in trasformazione.");
      break;
    case `memoria("mostra")`:
      logConsole("📚 Memoria: [Modulo1, Modulo2, Modulo3].");
      break;
    case `memoria("ripeti")`:
      logConsole("♻️ Ultimo comando ripetuto.");
      break;
    case `autoComando("esplora dati")`:
      logConsole("🔎 Esplorazione dati avviata.");
      break;
    case `suggerisci("crea ambiente virtuale")`:
      logConsole("🌐 Suggerimento attivo: creazione ambiente virtuale.");
      break;
    case `attivaModulo("modulo4")`:
      logConsole("🚀 Modulo 4 caricato. Visione Remota in attivazione...");
      break;
    case `test("funzioni")`:
      logConsole("🧪 Test in corso: tutte le funzioni rispondono.");
      break;
    default:
      logConsole("❌ Comando non riconosciuto. Ricontrolla la sintassi.");
      break;
  }
}
