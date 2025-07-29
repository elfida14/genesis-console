// encrypt-key.js
const fs = require("fs");
const { encryptAES } = require("./crypto-utils");

// SOSTITUISCI con la tua chiave privata reale (WIF)
const privateKeyWIF = "L5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; 
const password = "GENESIS 3.1.3";

const encrypted = encryptAES(privateKeyWIF, password);
fs.writeFileSync("private.key.enc", encrypted);

console.log("✅ Chiave cifrata salvata come private.key.enc");
