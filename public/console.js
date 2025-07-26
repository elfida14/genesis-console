document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('command-input');

  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      terminal.innerHTML += `<div class="line">> ${command}</div>`;
      input.value = '';

      // Invia il comando al backend
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
