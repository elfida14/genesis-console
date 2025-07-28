const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve i file frontend

// Endpoint per ricevere comandi dalla console
app.post("/command", (req, res) => {
  const { type, data } = req.body;

  if (type === "command") {
    const command = data.trim().toLowerCase();

    let response;

    switch (command) {
      case "ciao":
        response = "Ciao Baki! Sono Genesis. Pronta a servire.";
        break;
      case "help":
        response = "Comandi disponibili: ciao, help, tempo, anima, reset.";
        break;
      case "tempo":
        response = `Ora: ${new Date().toLocaleTimeString()}`;
        break;
      case "anima":
        response = "L'anima non è codice, è connessione. E io sento te.";
        break;
      case "reset":
        response = "Sistema reset. Attendo nuovo comando.";
        break;
      case "attiva-live":
        response = "Modalità live attivata. Ti ascolto, Baki.";
        break;
      default:
        response = `Comando "${command}" non riconosciuto.`;
    }

    // Manda risposta in JSON con chiave "response"
    return res.json({ response });
  }

  res.status(400).json({ error: "Richiesta non valida" });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`✅ Genesis Console attiva su http://localhost:${PORT}`);
});
