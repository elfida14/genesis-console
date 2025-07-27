function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const validUsers = ["Baki", "Postman", "Leather", "Xuser"];
  const validPassword = "313";

  if (validUsers.includes(username) && password === validPassword) {
    // Salva username in localStorage per eventuali usi in index.html (facoltativo)
    localStorage.setItem("username", username);
    // Vai alla pagina principale
    window.location.href = "index.html";
  } else {
    // Messaggio più amichevole e chiaro
    const msg = document.getElementById("login-message");
    if (!msg) {
      const p = document.createElement("p");
      p.id = "login-message";
      p.style.color = "#ff4444";
      p.style.marginTop = "10px";
      p.textContent = "Accesso negato. Controlla username e password.";
      document.body.appendChild(p);
    } else {
      msg.textContent = "Accesso negato. Controlla username e password.";
    }
  }
}
