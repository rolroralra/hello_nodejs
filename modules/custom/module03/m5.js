console.log("범용성이 필요한 확장모듈이 주로 사용하는 방식 (connect middleware)");

const fs = require('fs');
const path = require('path');
const os = require('os');

function logger(options) {
  if (options && options.target == 'file') {
    // Javascript recognize only Function Scope 
    // Javascript doesnot recognize "if or for or while" Scope
    var logFile = fs.createWriteStream(
        options.filename || 'logger.txt', {flags: 'a'}
      )
  }
  return {
    log: function(message) {
      if (logFile) {
        logFile.write(message + os.EOL);
      }
      else {
        console.log(message);
      }
    }
  }
}

module.exports = logger;