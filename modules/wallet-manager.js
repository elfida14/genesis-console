// modules/wallet-manager.js
const fs = require("fs");

const walletData = {
  conto: "Baki_Trust_Main",
  btc: "bc1q5q24gfcju0f2fgfl8w54p3szu9l0qjfa0ykppa",
  usdt: "0x13B30aa6E92F123bF04B8d45f76196566C4359D5",
  eth: "0x13B30aa6E92F123bF04B8d45f76196566C4359D5",
  logs: []
};

function logTransaction(type, amount, currency, status, to = "Trust") {
  const record = {
    time: new Date().toISOString(),
    conto: walletData.conto,
    to,
    type,
    amount,
    currency,
    status
  };
  walletData.logs.push(record);
  fs.writeFileSync("./wallet-log.json", JSON.stringify(walletData.logs, null, 2));
}

function inviaFondi(crypto, amount, tipo = "trust") {
  const addr = walletData[crypto.toLowerCase()];
  if (!addr) return `❌ Indirizzo per ${crypto} non configurato`;

  logTransaction("send", amount, crypto.toUpperCase(), "ESEGUITO", tipo);
  return `✅ ${amount} ${crypto.toUpperCase()} inviati a ${tipo} (${addr})`;
}

function getSaldoSimulato() {
  return {
    BTC: "0.0313",
    USDT: "1313.00",
    ETH: "0.313"
  };
}

module.exports = {
  inviaFondi,
  getSaldoSimulato
};
