// comandi-estesi.js - Modulo di comando potenziato Genesis

const axios = require("axios");

// Stato simulato di dispositivi, ambiente, sensori
const deviceState = {
  temperature: 22.5,
  humidity: 45,
  alertActive: false,
  intrusionDetected: false,
  lastMessage: "",
};

// Funzione per eseguire i comandi estesi
function executeCommand(command, user) {
  command = command.toLowerCase();

  if (command === "status") {
    return `✅ Stato attuale: Temperatura ${deviceState.temperature}°C, Umidità ${deviceState.humidity}%, Allarme: ${deviceState.alertActive ? "ATTIVO" : "INATTIVO"}`;
  }

  if (command === "allarme attiva") {
    deviceState.alertActive = true;
    return "🚨 Allarme attivato! Tutti i sistemi in allerta.";
  }

  if (command === "allarme disattiva") {
    deviceState.alertActive = false;
    return "✅ Allarme disattivato. Monitoraggio continuo.";
  }

  if (command.startsWith("invia messaggio ")) {
    const msg = command.slice(15);
    deviceState.lastMessage = msg;
    // In futuro potremmo integrare API reali per social, Telegram ecc.
    return `📡 Messaggio inviato: "${msg}"`;
  }

  if (command === "intrusione segnalata") {
    deviceState.intrusionDetected = true;
    return "⚠️ Intrusione rilevata! Preparare difese.";
  }

  if (command === "reset intrusioni") {
    deviceState.intrusionDetected = false;
    return "✅ Stato intrusioni resettato.";
  }

  if (command === "logs") {
    return "ℹ️ Per visualizzare i log usa l'endpoint /logs con accesso admin.";
  }

  if (command === "help") {
    return `🛠️ Comandi disponibili:
- status : Stato sistema
- allarme attiva / disattiva
- invia messaggio [testo]
- intrusione segnalata
- reset intrusioni
- logs
- help`;
  }

  return "❓ Comando non riconosciuto. Scrivi 'help' per assistenza.";
}

module.exports = { executeCommand };
