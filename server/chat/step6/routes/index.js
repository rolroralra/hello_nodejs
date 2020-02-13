const url = require('url');
const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const views = path.join(__dirname, '..', 'views');

function login(req, res) {
  var nickname = url.parse(req.url, true).query.username;
  if (nickname && nickname.trim() != '') {
    // TODO: session에 nickname 정보를 저장한다.
    req.session.userid = nickname;
    
    res.writeHead(303, {'Location': '/chat'});
  }
  else {
    res.writeHead(303, {'Location': '/'});
  }
  res.end();
}

// 채팅 화면으로 이동
function chat(req, res) {
  // TODO: session객체에서 nickname을 꺼낸다.
  var nickname = req.session.userid;

  // ejs: embedded JS       --> java
  // jsp: Java Server Page  --> Java언어가 내부된 html파일 rendering Engine
  var filename = path.join(views, 'chat.ejs');
  ejs.renderFile(filename, {nickname: nickname, title: '채팅방'}, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(data);
  });
}

function logout(req, res) {
  // TODO: session을 삭제
  req.session.destroy();

  
  res.writeHead(303, {'Location': '/'});
  res.end();
}

function router(req, res, next) {
  var pathname = url.parse(req.url).pathname;

  switch(pathname) {
    case '/login':
      login(req, res);
      break;
    case '/chat':
      chat(req, res);
      break;
    case '/logout':
      logout(req, res);
      break;
    default:
      next();
  }
}

module.exports = router;