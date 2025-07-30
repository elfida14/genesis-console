// walletManager.js - Modulo disattivato
// Questo modulo è stato disattivato temporaneamente. Nessuna funzionalità BTC attiva.

module.exports = {
  getBalance: async () => {
    return 0; // oppure "0.0000"
  },
  sendBTC: async (to, amount) => {
    return `TX-SIMULATA-${Date.now()}`;
  },
  address: "DISATTIVATO"
};
