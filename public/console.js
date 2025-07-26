document.addEventListener('DOMContentLoaded', () => {
  const keyInput = document.getElementById('key-input');
  const authSection = document.getElementById('auth-section');
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('command-input');
  const inputSection = document.getElementById('input-section');

  const accessKey = "GENESYS3.3"; // Qui puoi cambiarla quando vuoi

  keyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (keyInput.value === accessKey) {
        authSection.style.display = 'none';
        terminal.style.display = 'block';
        inputSection.style.display = 'block';
        terminal.innerHTML += `<div class="line">🔓 Accesso autorizzato. Benvenuto, Mahdi.</div>`;
        terminal.innerHTML += `<div class="line">🧬 GENESIS 313 ONLINE.</div>`;
        terminal.innerHTML += `<div class="line">Digitare un comando per iniziare...</div>`;
      } else {
        terminal.innerHTML += `<div class="line">❌ Chiave errata. Riprova.</div>`;
      }
    }
  });

  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      terminal.innerHTML += `<div class="line">> ${command}</div>`;
      input.value = '';

      const res = await fetch('/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'console', data: command }),
      });

      const result = await res.json();
      terminal.innerHTML += `<div class="response">↳ ${result.type}: ${result.data || 'eseguito'}</div>`;
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
});
