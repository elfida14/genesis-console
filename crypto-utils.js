// crypto-utils.js
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const iv = Buffer.alloc(16, 0); // IV statico per semplicità

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

function encryptAES(text, password) {
  const key = crypto.createHash("sha256").update(password).digest();
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("base64");
}

module.exports = { decryptAES, encryptAES };
