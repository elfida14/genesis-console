module.exports = (req, res, next) => {
  const key = req.headers['x-genesis-code'];
  if (key === "313CENTOTRE") {
    console.log("🔓 Accesso sacro concesso.");
    next();
  } else {
    res.status(403).send("🔒 Accesso negato. Codice sacro mancante.");
  }
};
