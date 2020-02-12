const fs = require('fs');
const EOL = require('os').EOL;

function logger(options) {
  if (options && options.target == 'file') {
    // Logging File
    var logfile = fs.createWriteStream(options.filename || 'log.txt', {flags: 'a'});
  }

  return function(req, res, next) {
    if (logfile) {
      logfile.write(`[${Date()}] ${res.statusCode} ${req.url}${EOL}`);
    }
    else {
      console.log(`[${Date()}] ${res.statusCode} ${req.url}`);
    }
    
    next();
  };
}


module.exports = logger;