document.getElementById('pingButton').addEventListener('click', () => inviaComando('PING'));
document.getElementById('btcButton').addEventListener('click', () => inviaComando('INVIA_50'));
document.getElementById('revolutButton').addEventListener('click', () => inviaComando('INVIA_20000'));
document.getElementById('couponButton').addEventListener('click', () => inviaComando('ATTIVA_COUPON'));

function inviaComando(comando) {
  fetch('/comandi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ command: comando })
  })
    .then(response => response.text())
    .then(data => {
      document.getElementById('status').textContent = data;
    })
    .catch(error => {
      console.error('❌ Errore di rete:', error);
      document.getElementById('status').textContent = '❌ Errore di rete: ' + error.message;
    });
}
