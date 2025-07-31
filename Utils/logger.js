const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../genesis.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, entry, 'utf8');
  console.log(entry.trim());
}

module.exports = { log };
