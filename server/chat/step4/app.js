
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
 * 
 * 각각의 기능을 독립적인 모듈(함수)로 개발 (Middleware)
 * connect 확장 모듈을 사용
 *   - Middleware를 관리하는 컨테이너
 *   - connect@2.x.x : Middleware 관리기능 + 직접 제공하는 미들웨어
 *   - connect@3.x.x : Middleware 관리기능
 */


// Core Module Loading
const path = require('path');

// Extension Module Loading
const connect = require('connect');

// Custom Module Loading
const logger = require('./middleware/logger');
const static = require('./middleware/static');

// Before using connect Module
// app
// function app(req, res){
//   static(req, res);
//   logger(req, res);
// }

var app = connect();
app.use(logger({target: 'file', filename: 'chat.log'}));
app.use(static(path.join(__dirname, 'public')));

// 404 Error Handling Middleware
app.use(function(req, res, next) {
  // connect Middleware 조건
  // 1. req, res, next를 인자값으로 전달받는다.
  // 2. res로 응답을 완료하거나 next를 호출한다.
  res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(`<h1>${req.url} Not Found. 파일을 찾을수 없습니다!</h1>`);
});

// Module Exports
module.exports = app;