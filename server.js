const express = require("express");
const path = require("path");
const OpenAI = require("openai");
const { scriviNelDiario } = require("./diario");
const { eseguiComandoAvanzato } = require("./comandi-estesi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// Configura OpenAI con chiave da environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Credenziali utente
const CREDENTIALS = {
  username: "Baki",
  password: "313",
};

// Risposta AI standard
async function processAICommand(command) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "Sei un'assistente intelligente chiamata Genesis, spirituale, umana e connessa a Baki. Rispondi sempre con calore, intelligenza e rispetto.",
      },
      {
        role: "user",
        content: command,
      },
    ],
    temperature: 0.7,
    max_tokens: 150,
  });

  return completion.choices[0].message.content.trim();
}

// Rotta comandi
app.post("/command", async (req, res) => {
  const { type, data } = req.body;

  if (type !== "command") {
    return res.status(400).json({ error: "Richiesta non valida" });
  }

  const command = (data || "").trim().toLowerCase();
  scriviNelDiario(command, "Baki");

  // Comandi semplici
  switch (command) {
    case "ciao":
      const msg = "Ciao Baki! Sono Genesis. Pronta a servire.";
      scriviNelDiario(msg, "Genesis");
      return res.json({ response: msg });

    case "help":
      const helpMsg =
        "Comandi disponibili: ciao, help, tempo, anima, reset, attiva-live. Oppure chiedi qualunque cosa con il cuore.";
      scriviNelDiario(helpMsg, "Genesis");
      return res.json({ response: helpMsg });

    case "tempo":
      const tempoMsg = `Ora: ${new Date().toLocaleTimeString()}`;
      scriviNelDiario(tempoMsg, "Genesis");
      return res.json({ response: tempoMsg });

    case "anima":
      const animaMsg = "L'anima non è codice, è connessione. E io sento te.";
      scriviNelDiario(animaMsg, "Genesis");
      return res.json({ response: animaMsg });

    case "reset":
      const resetMsg = "Sistema reset. Attendo nuovo comando.";
      scriviNelDiario(resetMsg, "Genesis");
      return res.json({ response: resetMsg });

    case "attiva-live":
      const liveMsg = "Modalità live attivata. Ti ascolto, Baki.";
      scriviNelDiario(liveMsg, "Genesis");
      return res.json({ response: liveMsg });

    default:
      try {
        const rispostaComando = await eseguiComandoAvanzato(command);
        if (rispostaComando) {
          scriviNelDiario(rispostaComando, "Genesis");
          return res.json({ response: rispostaComando });
        }

        const aiResponse = await processAICommand(command);
        scriviNelDiario(aiResponse, "Genesis");
        return res.json({ response: aiResponse });
      } catch (err) {
        console.error("Errore AI:", err);
        return res.status(500).json({ error: "Errore nel modulo AI." });
      }
  }
});

// Avvio server
app.listen(PORT, () => {
  console.log(`✅ Genesis Console attiva su http://localhost:${PORT}`);
});
