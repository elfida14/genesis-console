// EncryptKey.js
const fs = require("fs");
const { encryptAES } = require("./crypto-utils");

// Questa è la tua chiave privata ETH/WIF (quella che mi hai mandato)
const privateKeyWIF = "L4mD5D3YXYNb1MEQ4qXtN9WgjDhPQ9uH6PgLULvSc7uT9ChX4AfJ";

// Questa è la password che userai per cifrare e che hai già impostato su Render come variabile d'ambiente
const password = "GENESIS 3.1.3";

const encrypted = encryptAES(privateKeyWIF, password);

// Qui scegli il nome esatto del file cifrato che vuoi creare (per te ho messo "privateKeyEngine")
fs.writeFileSync("privateKeyEngine", encrypted);

console.log("✅ Chiave cifrata salvata come privateKeyEngine");
