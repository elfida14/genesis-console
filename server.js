const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend static files

const CREDENTIALS = {
  username: "Baki",
  password: "313"
};

// Endpoint per i comandi
app.post("/command", (req, res) => {
  const { type, data } = req.body;

  if (type !== "command") {
    return res.status(400).json({ error: "Richiesta non valida" });
  }

  const command = (data || "").trim().toLowerCase();

  let response;

  switch (command) {
    case "ciao":
      response = "Ciao Baki! Sono Genesis. Pronta a servire.";
      break;
    case "help":
      response = "Comandi disponibili: ciao, help, tempo, anima, reset, attiva-live.";
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

  return res.json({ response });
});

app.listen(PORT, () => {
  console.log(`✅ Genesis Console attiva su http://localhost:${PORT}`);
});
