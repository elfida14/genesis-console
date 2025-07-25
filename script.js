function eseguiComando() {
  const input = document.getElementById("console").value.trim().toLowerCase();
  const output = document.getElementById("output");
  const campo = document.getElementById("vision-field");

  switch (input) {
    case "entra simulazione":
      output.textContent = "Simulazione attivata. Benvenuto, Operatore 313.";
      campo.style.background = "#220022";
      break;

    case "attiva visione remota":
      output.textContent = "Visione Remota attivata.";
      campo.style.background = "#002244";
      break;

    case "carica ambiente città":
      output.textContent = "Ambiente urbano caricato. Interazione possibile.";
      campo.style.background = "#333300";
      break;

    case "potenzia sistema":
      output.textContent = "Sistema potenziato. GENESIS operativo al 97%.";
      campo.style.background = "#002200";
      break;

    case "connessione totale":
      output.textContent = "Connessione globale stabilita.";
      campo.style.background = "#004400";
      break;

    case "mostra stato":
      output.textContent = `
Stato attuale:
- Visione remota: ATTIVA
- Campo visivo: ONLINE
- Potenza sistema: 97%
- Modalità difesa: SH1
- Modalità attacco: PH1`;
      break;

    case "resetta console":
      output.textContent = "Console resettata.";
      campo.style.background = "#002200";
      break;

    // SHIELD
    case "attiva difesa sh1":
    case "attiva difesa sh2":
    case "attiva difesa sh3":
    case "attiva difesa sh4":
    case "attiva difesa sh5":
    case "attiva difesa sh6":
    case "attiva difesa sh7":
    case "attiva difesa sh8":
      output.textContent = `Sistema di difesa ${input.split(" ")[2].toUpperCase()} attivato.`;
      campo.style.background = "#003300";
      break;

    // PHASE
    case "attiva attacco ph1":
    case "attiva attacco ph2":
    case "attiva attacco ph3":
    case "attiva attacco ph4":
    case "attiva attacco ph5":
    case "attiva attacco ph6":
    case "attiva attacco ph7":
    case "attiva attacco ph8":
      output.textContent = `Sistema di attacco ${input.split(" ")[2].toUpperCase()} pronto.`;
      campo.style.background = "#440000";
      break;

    default:
      output.textContent = "Comando non riconosciuto.";
      break;
  }

  document.getElementById("console").value = "";
}
