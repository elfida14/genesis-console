// Simula autenticazione base
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "313") {
        document.getElementById("login-status").innerText = "Accesso consentito";
        document.getElementById("control-panel").style.display = "block";
        document.getElementById("login-section").style.display = "none";
    } else {
        document.getElementById("login-status").innerText = "Credenziali errate.";
    }
}

// Simula invio comando e risposta AI
function sendCommand() {
    const command = document.getElementById("command").value.trim();
    const status = document.getElementById("device-status");
    const response = document.getElementById("ai-response");

    if (!command) {
        response.innerText = "Nessun comando inviato.";
        return;
    }

    status.innerText = `Invio comando: "${command}"...`;
    response.innerText = "";

    setTimeout(() => {
        // Risposta simulata dell'intelligenza artificiale
        response.innerText = `AI: Comando "${command}" ricevuto. Azione eseguita.`;
        status.innerText = "Dispositivo risponde positivamente.";
    }, 1500);
}
