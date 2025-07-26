// routes/profilo.js
const express = require('express');
const router = express.Router();

// Mock DB utenti - in pratica sarà collegato a DB reale
const utenti = [
  { id: 1, nome: 'Baki', ruolo: 'admin', livelloAccesso: 10, statoGenesis: 'attivo' },
  { id: 2, nome: 'Operatore1', ruolo: 'operatore', livelloAccesso: 5, statoGenesis: 'standby' },
  { id: 3, nome: 'Ospite', ruolo: 'ospite', livelloAccesso: 1, statoGenesis: 'limitato' }
];

// Middleware controllo permessi
function controlloAccesso(livelloRichiesto) {
  return (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ errore: 'Utente non autenticato' });

    const utente = utenti.find(u => u.id == userId);
    if (!utente) return res.status(404).json({ errore: 'Utente non trovato' });

    if (utente.livelloAccesso < livelloRichiesto) {
      return res.status(403).json({ errore: 'Accesso negato: permessi insufficienti' });
    }
    req.utente = utente;
    next();
  }
}

// GET /profilo/:id - ottieni info profilo (livello 1 minimo)
router.get('/:id', controlloAccesso(1), (req, res) => {
  const id = parseInt(req.params.id);
  const utente = utenti.find(u => u.id === id);
  if (!utente) return res.status(404).json({ errore: 'Utente non trovato' });

  res.json({
    id: utente.id,
    nome: utente.nome,
    ruolo: utente.ruolo,
    livelloAccesso: utente.livelloAccesso,
    statoGenesis: utente.statoGenesis
  });
});

// POST /profilo/:id/aggiorna - aggiorna dati profilo (livello 7 minimo)
router.post('/:id/aggiorna', controlloAccesso(7), (req, res) => {
  const id = parseInt(req.params.id);
  const utente = utenti.find(u => u.id === id);
  if (!utente) return res.status(404).json({ errore: 'Utente non trovato' });

  const { nome, ruolo, livelloAccesso, statoGenesis } = req.body;
  if (nome) utente.nome = nome;
  if (ruolo) utente.ruolo = ruolo;
  if (livelloAccesso) utente.livelloAccesso = livelloAccesso;
  if (statoGenesis) utente.statoGenesis = statoGenesis;

  // Log aggiornamento profilo
  console.log(`Profilo utente ${id} aggiornato da utente ${req.utente.id}`);

  res.json({ messaggio: 'Profilo aggiornato con successo', profilo: utente });
});

// GET /profilo/tutti - lista utenti (livello 5 minimo)
router.get('/tutti', controlloAccesso(5), (req, res) => {
  res.json(utenti);
});

module.exports = router;
