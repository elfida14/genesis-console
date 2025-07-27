// Configurazione credenziali unificate
const CREDENTIALS = {
  username: "Baki",
  password: "313"
};

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    document.getElementById("login-status").innerText = "✅ Accesso consentito, benvenuto Baki!";
    document.getElementById("control-panel").style.display = "block";
    document.getElementById("login-section").style.display = "none";
  } else {
    document.getElementById("login-status").innerText = "❌ Credenziali errate. Riprova.";
  }
}

async function sendCommand() {
  const command = document.getElementById("command").value.trim();
  const status = document.getElementById("device-status");
  const response = document.getElementById("ai-response");

  if (!command) {
    response.innerText = "⚠️ Nessun comando inviato.";
    return;
  }

  status.innerText = `⏳ Invio comando: "${command}"...`;
  response.innerText = "";

  try {
    const res = await fetch('/command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user': CREDENTIALS.username
      },
      body: JSON.stringify({ type: 'command', data: command })
    });

    const data = await res.json();
    if (res.ok) {
      response.innerText = `🤖 AI: ${data.response || JSON.stringify(data)}`;
      status.innerText = "✅ Comando eseguito con successo.";
    } else {
      response.innerText = `⚠️ Errore: ${data.errore || 'Risposta non valida.'}`;
      status.innerText = "❌ Comando non eseguito.";
    }
  } catch (err) {
    response.innerText = `❌ Errore di comunicazione: ${err.message}`;
    status.innerText = "❌ Comando non eseguito.";
  }
}
