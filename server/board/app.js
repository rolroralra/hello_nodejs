var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/board', function(req, res, next) {
  console.log('-------------------------------')
  console.log('BEFORE JSON Request Body Parsing & URL Encoding & Cookie Parsing');
  console.log('method', req.method);
  console.log('body', req.body);
  console.log('cookies', req.cookies);
  // console.log('req.headers.cookie', req.headers.cookie);
  console.log('-------------------------------')
  next();
});

// Logging
app.use(logger('dev'));

// JSON Request Body Parsing
app.use(express.json());

// URL Encoding & Decoding
app.use(express.urlencoded({ extended: false }));

// Cookie Parsing
app.use(cookieParser());

// Static Resource Response
app.use(express.static(path.join(__dirname, 'public')));

// Method Override
// 일반적으로 브라우저에서는 form태그의 submit에서 GET, POST 메서드만 지원해주는 관계로..
// 서버에서 URL queryString을 이용해서 Method Override 하는걸로 구현.
app.use(methodOverride('_method'));

app.use('/board', function(req, res, next) {
  console.log('-------------------------------')
  console.log('AFTER JSON Request Body Parsing & URL Encoding & Cookie Parsing');
  console.log('method', req.method);
  console.log('body', req.body);
  console.log('cookies', req.cookies);
  console.log('-------------------------------')
  next();
});

// Dynamic Resource Response (Router)
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
