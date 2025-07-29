// modules/deploy-commander.js
const { exec } = require('child_process');

const deployCommander = {
  run: (command, callback) => {
    exec(command, (err, stdout, stderr) => {
      if (err) return callback(err, null);
      callback(null, stdout.trim());
    });
  }
};

module.exports = deployCommander;
