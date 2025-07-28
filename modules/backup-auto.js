const fs = require('fs');

function backupData() {
  const timestamp = new Date().toISOString();
  const data = {
    status: "ACTIVE",
    memory: "parallel_log_313",
    backupTime: timestamp
  };

  fs.writeFileSync(`logs/backup-${timestamp}.json`, JSON.stringify(data, null, 2));
  console.log(`💾 Backup completato alle ${timestamp}`);
}

// Ogni 33 minuti
setInterval(backupData, 33 * 60 * 1000);
