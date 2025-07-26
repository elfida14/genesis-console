function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Baki" && password === "313centotre") {
    window.location.href = "index.html";
  } else {
    alert("Accesso negato.");
  }
}
