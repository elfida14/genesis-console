document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#commandForm");
  const input = document.querySelector("#commandInput");
  const output = document.querySelector("#output");
  const buttons = document.querySelectorAll("button[data-cmd]");

  // Invia comando da input manuale
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const command = input.value.trim();
    if (command) {
      await sendCommand(command);
      input.value = "";
    }
  });

  // Invia comando dai pulsanti predefiniti
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const command = button.getAttribute("data-cmd");
      await sendCommand(command);
    });
  });

  // Funzione di invio comando
  async function sendCommand(command) {
    try {
      const response = await fetch("/api/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": "313" // stessa chiave che hai usato in .env
        },
        body: JSON.stringify({ command })
      });

      const data = await response.json();
      if (response.ok) {
        output.innerHTML += `<div class="success">✅ ${command} → ${JSON.stringify(data)}</div>`;
      } else {
        output.innerHTML += `<div class="error">❌ ${command} → ${data.error || "Errore"}</div>`;
      }
    } catch (error) {
      output.innerHTML += `<div class="error">❌ Errore di rete: ${error.message}</div>`;
    }
  }
});
