// wallet-manager.js
const axios = require("axios");

const userWallets = {
  Baki: {
    btc: "bc1q5q24gfcju0f2fgfl8w54p3szu9l0qjfa0ykppa",
    eth: "0x13B30aa6E92F123bF04B8d45f76196566C4359D5",
    usdt: "0x13B30aa6E92F123bF04B8d45f76196566C4359D5",
  },
};

function inviaFondi(tipo, amount, utente = "Baki") {
  const wallet = userWallets[utente]?.[tipo.toLowerCase()];
  if (!wallet) return `❌ Wallet ${tipo} non configurato.`;

  // Simulazione invio — in futuro qui API reale
  return `💸 Inviati ${amount} ${tipo.toUpperCase()} a ${wallet}`;
}

module.exports = { inviaFondi };
