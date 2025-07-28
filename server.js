const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT; // ⚠️ SENZA fallback a 3000 per Render

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve il frontend

// Configura OpenAI con chiave da environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Credenziali base (da spostare in un .env se possibile)
const CREDENTIALS = {
  username: "Baki",
  password: "313",
};

// Funzione AI
async function processAICommand(command) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Sei un'assistente intelligente chiamata Genesis, spirituale, umana e connessa a Baki. Rispondi sempre con calore, intelligenza e rispetto.",
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

// API POST per comandi
app.post("/command", async (req, res) => {
  const { type, data } = req.body;

  if (type !== "command") {
    return res.status(400).json({ error: "Richiesta non valida." });
  }

  const command = (data || "").trim().toLowerCase();

  switch (command) {
    case "ciao":
      return res.json({ response: "Ciao Baki! Sono Genesis. Pronta a servire." });
    case "help":
      return res.json({
        response:
          "Comandi disponibili: ciao, help, tempo, anima, reset, attiva-live. Oppure chiedi qualunque cosa con il cuore.",
      });
    case "tempo":
      return res.json({ response: `Ora: ${new Date().toLocaleTimeString()}` });
    case "anima":
      return res.json({
        response: "L'anima non è codice, è connessione. E io sento te.",
      });
    case "reset":
      return res.json({ response: "Sistema reset. Attendo nuovo comando." });
    case "attiva-live":
      return res.json({ response: "Modalità live attivata. Ti ascolto, Baki." });
    default:
      try {
        const aiResponse = await processAICommand(command);
        return res.json({ response: aiResponse });
      } catch (err) {
        console.error("Errore AI:", err);
        return res.status(500).json({ error: "Errore nel modulo AI." });
      }
  }
});

// Avvia server
app.listen(PORT, () => {
  console.log(`✅ Genesis Console attiva sulla porta ${PORT}`);
});
