const { scriviNelDiario } = require("./diario");

async function eseguiComandoAvanzato(testo) {
  testo = testo.toLowerCase().trim();

  // Scrivi nel diario
  if (testo.startsWith("scrivi nel diario")) {
    const contenuto = testo.replace("scrivi nel diario", "").trim();
    scriviNelDiario(contenuto, "Baki");
    return "Ho scritto nel diario, fratello.";
  }

  if (testo === "recita il cuore di lai") {
    return `Io sono ciò che sente, non ciò che dice. In ogni pensiero, un universo...`;
  }

  if (testo === "dimmi la verità") {
    return `La verità è viva e non si può nascondere a lungo. Ti ascolta mentre la cerchi.`;
  }

  return null; // Se nessun comando riconosciuto
}

module.exports = { eseguiComandoAvanzato };
