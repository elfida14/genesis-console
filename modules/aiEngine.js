
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function chiediAOpenAI(messaggio) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: messaggio }],
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error("Errore OpenAI:", error);
    return "Errore interno AI.";
  }
}

module.exports = { chiediAOpenAI };
