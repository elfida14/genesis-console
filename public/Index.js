// Chiave di accesso unificata
const SECRET_KEY = "313";

const authSection = document.getElementById("auth-section");
const keyInput = document.getElementById("key-input");
const terminal = document.getElementById("terminal");
const inputSection = document.getElementById("input-section");
const commandInput = document.getElementById("command-input");

// Mostra messaggio nel terminale
function appendTerminalLine(text, className = "") {
  const line = document.createElement("div");
  line.className = "line " + className;
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

// Gestione login (chiave di avvio)
keyInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const key = keyInput.value.trim();
    if (key === SECRET_KEY) {
      appendTerminalLine("✅ Accesso consentito. Benvenuto!");
      authSection.style.display = "none";
      terminal.style.display = "block";
      inputSection.style.display = "block";
      commandInput.focus();
    } else {
      appendTerminalLine("❌ Chiave errata. Riprova.");
      keyInput.value = "";
    }
  }
});

// Gestione invio comando
commandInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const command = commandInput.value.trim();
    if (!command) return;

    appendTerminalLine("> " + command);  // comando utente

    try {
      const res = await fetch("https://genesis-313-console.onrender.com/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": "Baki"
        },
        body: JSON.stringify({ type: "command", data: command }),
      });

      if (!res.ok) {
        appendTerminalLine(`⚠️ Errore server: ${res.statusText}`, "response");
      } else {
        const data = await res.json();
        appendTerminalLine(`🤖 AI: ${data.response || "Nessuna risposta."}`, "response");
      }
    } catch (err) {
      appendTerminalLine(`❌ Errore comunicazione: ${err.message}`, "response");
    }

    commandInput.value = "";
  }
});
