function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const validUser = "Baki";
  const validPassword = "313";

  const msg = document.getElementById("login-message");

  if (username === validUser && password === validPassword) {
    localStorage.setItem("username", username);
    window.location.href = "index.html";
  } else {
    msg.textContent = "Accesso negato. Controlla username e password.";
  }
}
