document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('comando');
  const log = document.getElementById('log');

  const appendLog = (text, classe = '') => {
    const p = document.createElement('p');
    p.textContent = text;
    if (classe) p.classList.add(classe);
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  };

  document.getElementById('formComando').addEventListener('submit', async (e) => {
    e.preventDefault();
    const comando = input.value.trim();
    if (!comando) return;

    appendLog(`> ${comando}`, 'utente');
    input.value = '';

    let response;
    try {
      switch (comando.toLowerCase()) {
        case 'status':
          response = await fetch('/genesis/stato');
          break;
        case 'attiva linguaggio vivo':
          response = await fetch('/genesis/linguaggio', { method: 'POST' });
          break;
        case 'avvia modalità segreta':
          const chiave = prompt("Inserisci la chiave segreta:");
          response = await fetch('/genesis/segreto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pass: chiave })
          });
          break;
        case 'memoria':
          response = await fetch('/genesis/memoria');
          break;
        case 'chi sei':
          response = await fetch('/genesis/coscienza');
          break;
        default:
          appendLog('❌ Comando non riconosciuto.', 'errore');
          return;
      }

      const data = await response.json();
      appendLog('↳ ' + JSON.stringify(data, null, 2), 'sistema');
    } catch (error) {
      appendLog('⚠️ Errore di connessione con Genesis.', 'errore');
    }
  });
}); 
