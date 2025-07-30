// couponEngine.js
const fs = require('fs');
const path = require('path');

const COUPON_FILE = path.join(__dirname, 'coupons.json');

// Crea un nuovo codice
function generateCoupon(code, action, amount = 0) {
  const coupons = readCoupons();
  coupons[code] = { action, amount, used: false, createdAt: new Date() };
  saveCoupons(coupons);
  return coupons[code];
}

// Verifica se un codice è valido
function validateCoupon(code) {
  const coupons = readCoupons();
  if (!coupons[code]) return { valid: false, reason: 'Codice non trovato' };
  if (coupons[code].used) return { valid: false, reason: 'Già usato' };
  return { valid: true, data: coupons[code] };
}

// Usa un codice una sola volta
function markAsUsed(code) {
  const coupons = readCoupons();
  if (coupons[code]) {
    coupons[code].used = true;
    coupons[code].usedAt = new Date();
    saveCoupons(coupons);
  }
}

function readCoupons() {
  if (!fs.existsSync(COUPON_FILE)) return {};
  return JSON.parse(fs.readFileSync(COUPON_FILE));
}

function saveCoupons(data) {
  fs.writeFileSync(COUPON_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  generateCoupon,
  validateCoupon,
  markAsUsed,
};
