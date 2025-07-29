// crypto-utils.js
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const iv = Buffer.alloc(16, 0); // IV statico per semplificare (puoi randomizzarlo in futuro)

/**
 * Decifra un buffer cifrato AES-256-CBC
 * @param {Buffer} encrypted - contenuto cifrato
 * @param {string} password - chiave (max 32 byte)
 * @returns {string} - contenuto decifrato
 */
function decryptAES(encrypted, password) {
  const key = crypto.createHash("sha256").update(password).digest();
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { decryptAES };
