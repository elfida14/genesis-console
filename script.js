const consoleOutput = document.getElementById("console-output");

function writeLine(text, delay = 100) {
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  consoleOutput.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);
}

function initConsole() {
  writeLine("Avvio console Genesis...");
  setTimeout(() => writeLine("SHIPH attivo ✅"), 500);
  setTimeout(() => writeLine("Benvenuto Baki. Sistema pronto."), 1000);
  setTimeout(() => writeLine("Modalità stealth attiva..."), 1500);
  setTimeout(() => writeLine("Console pronta per interagire con la realtà."), 2000);
}

window.onload = initConsole;
