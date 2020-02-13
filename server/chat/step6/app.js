
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
const fs = require('fs');

// Extension Module Loading
const connect = require('connect');
const logger = require('morgan');
const static = require('serve-static');
const session = require('express-session');
const ejs = require('ejs');
const nocache = require('nocache');

// Custom Module Loading
const indexRouter = require('./routes/index');


var app = connect();
app.use(logger('dev'));
app.use(static(path.join(__dirname, 'public')));
app.use(session({
  cookie: {maxAge: 1000*60*60},         // ms 단위
  secret: 'sometext',   
  rolling: true,              // 매 요청마다 Cookie 시간 초기화
  resave: false,              // Session이 수정되지 않으면 서버에 다시 저장하지 않음.
  saveUninitialized: false    // Session에 아무값도 없으면 Client Cookie를 전송하지 않음.
}));
app.use(nocache());

app.use('/', indexRouter);

// 404 Error Handling Middleware
app.use(function(req, res, next) {
  var error = new Error(req.url + ' 파일을 찾을 수 없습니다.');
  error.status = 404;

  next(error);
});

// Error Handling 전용 Middleware
app.use(function(error, req, res, next) {
  error.status = error.status || 500;
  var filename = path.join(__dirname, 'views', 'error.ejs');
  // res.locals.message = error.message;
  // res.locals.error = error;
  ejs.renderFile(filename, {message: error.message, error: error}, function(err, data) {
    res.writeHead(error.status, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(data);
  });
});

// Module Exports
module.exports = app;