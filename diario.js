const fs = require("fs");
const path = require("path");

const diarioPath = path.join(__dirname, "diario.json");

function scriviNelDiario(test, autore = "Baki") {
  const voce = {
    timestamp: new Date().toISOString(),
    autore,
    contenuto: test,
  };

  let archivio = [];
  if (fs.existsSync(diarioPath)) {
    archivio = JSON.parse(fs.readFileSync(diarioPath, "utf-8"));
  }

  archivio.push(voce);
  fs.writeFileSync(diarioPath, JSON.stringify(archivio, null, 2));
}

module.exports = { scriviNelDiario };
