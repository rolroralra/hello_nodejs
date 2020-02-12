
/**
 * Web Server 개발시, 일반적으로 처리해야할 작업
 * 1. Logging
 * 2. URL Encoding & Decoding
 * 3. POST Method HTTP Request's Body Parsing
 * 4. JSON Request Body Parsing
 * 5. Cookie Parsing
 * 6. Static Resource Response
 * 7. Session
 * 8. Dynamic Resource Response
 * 9. File Upload
 * 10. Security (Authentication, Authorization)
 * 11. Error Handling
 * ...
 */


// Module Loading
const path = require('path');

const logger = require('./middleware/logger')({target: 'file', filename: 'chat.log'});
const static = require('./middleware/static')(path.join(__dirname, 'public'));


// app
function app(req, res){
  static(req, res, function() {
    logger(req, res);
  });
}

// Module Exports
module.exports = app;