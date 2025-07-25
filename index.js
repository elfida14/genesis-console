const express = require('express');
const app = express();
const PORT = process.env.PORT || 3130;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🌱 Genesis 313 Console online.');
});

// Esempio di endpoint per ricevere comandi
app.post('/command', (req, res) => {
  const { type, data } = req.body;
  console.log('🧠 Comando ricevuto:', type, data);
  res.json({ status: 'ricevuto', type, data });
});

app.listen(PORT, () => {
  console.log(`🚀 Genesis Console attiva sulla porta ${PORT}`);
});
