document.addEventListener("DOMContentLoaded", () => {
  const userKey = localStorage.getItem('x-user');
  if (!userKey) return window.location.href = "login.html";

  const buttons = document.querySelectorAll("button[data-cmd]");
  const output = document.getElementById("output");

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const cmd = button.getAttribute("data-cmd");
      const res = await fetch("/comandi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": userKey
        },
        body: JSON.stringify({ comando: cmd })
      });

      const txt = await res.text();
      const line = `> ${cmd}\n${txt}\n`;
      output.value += line;
      output.scrollTop = output.scrollHeight;
    });
  });
});
