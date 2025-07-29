// crypto-utils.js
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const iv = Buffer.alloc(16, 0); // IV statico per semplificare

/**
 * Decifra un buffer cifrato AES-256-CBC
 * @param {Buffer | string} encrypted - contenuto cifrato (buffer o base64)
 * @param {string} password - chiave (max 32 byte)
 * @returns {string} - contenuto decifrato
 */
function decryptAES(encrypted, password) {
  if (typeof encrypted === "string") {
    encrypted = Buffer.from(encrypted, "base64");
  }
  const key = crypto.createHash("sha256").update(password).digest();
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

/**
 * Cifra una stringa in AES-256-CBC (compatibile con decryptAES)
 * @param {string} text - il contenuto da cifrare
 * @param {string} password - la chiave
 * @returns {string} - base64 cifrato
 */
function encryptAES(text, password) {
  const key = crypto.createHash("sha256").update(password).digest();
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("base64");
}

module.exports = { decryptAES, encryptAES };
