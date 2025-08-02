const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

// Nuova configurazione con openai@4.x
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chiediAOpenAI(messaggio) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: messaggio }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('❌ Errore OpenAI:', error);
    return 'Errore interno AI.';
  }
}

module.exports = { chiediAOpenAI };
