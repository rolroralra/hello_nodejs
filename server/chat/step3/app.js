// Module Loading
const path = require('path');

const logger = require('./middleware/logger')({target: 'file', filename: 'chat.log'});
const static = require('./middleware/static')(path.join(__dirname, 'public'));


// app
function app(req, res){
  static(req, res);
  logger(req, res);
}

// Module Exports
module.exports = app;