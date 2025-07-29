// deploy-commander.js
const { exec } = require("child_process");

function run(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback(error, null);
    } else if (stderr) {
      callback(new Error(stderr), null);
    } else {
      callback(null, stdout);
    }
  });
}

module.exports = { run };
