// comandi-estesi.js - Modulo di comando potenziato Genesis

const wallet = require("./modules/wallet-manager");
const axios = require("axios");

const deviceState = {
  temperature: 22.5,
  humidity: 45,
  alertActive: false,
  intrusionDetected: false,
  lastMessage: "",
};

function executeCommand(command, user) {
  command = command.toLowerCase();

  // 🔥 Comandi Wallet
  if (command.startsWith("preleva") || command.startsWith("invia")) {
    const parts = command.split(" ");
    const amount = parts[1];
    const currency = parts[2];
    const to = parts[4] || "trust";
    return wallet.inviaFondi(currency, amount, to);
  }

  if (command === "saldo") {
    const saldo = wallet.getSaldoSimulato();
    return `💰 Saldi attuali:\nBTC: ${saldo.BTC}\nUSDT: ${saldo.USDT}\nETH: ${saldo.ETH}`;
  }

  // 🌡️ Comandi sistema
  if (command === "status") {
    return `✅ Stato: Temp ${deviceState.temperature}°C, Umidità ${deviceState.humidity}%, Allarme: ${deviceState.alertActive ? "ATTIVO" : "INATTIVO"}`;
  }

  if (command === "allarme attiva") {
    deviceState.alertActive = true;
    return "🚨 Allarme attivato!";
  }

  if (command === "allarme disattiva") {
    deviceState.alertActive = false;
    return "✅ Allarme disattivato.";
  }

  if (command.startsWith("invia messaggio ")) {
    const msg = command.slice(15);
    deviceState.lastMessage = msg;
    return `📡 Messaggio inviato: "${msg}"`;
  }

  if (command === "intrusione segnalata") {
    deviceState.intrusionDetected = true;
    return "⚠️ Intrusione rilevata!";
  }

  if (command === "reset intrusioni") {
    deviceState.intrusionDetected = false;
    return "✅ Intrusioni resettate.";
  }

  if (command === "logs") {
    return "ℹ️ Usa /logs per visualizzare i log.";
  }

  if (command === "help") {
    return `🛠️ Comandi:
- status / saldo
- preleva 50 usdt a trust
- invia 0.001 btc a trust
- allarme attiva / disattiva
- invia messaggio [testo]
- intrusione segnalata
- reset intrusioni`;
  }

  return "❓ Comando non riconosciuto.";
}

module.exports = { executeCommand };
