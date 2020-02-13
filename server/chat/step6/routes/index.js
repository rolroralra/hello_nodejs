const url = require('url');
const fs = require('fs');
const path = require('path');

const views = path.join(__dirname, '..', 'views');

function login(req, res) {
  var nickname = url.parse(req.url, true).query.username;
  if (nickname && nickname.trim() != '') {
    // TODO: session에 nickname 정보를 저장한다.
    req.session.userid = nickname;
    
    res.writeHead(303, {'location': '/chat'});
  }
  else {
    res.writeHead(303, {'location': '/'});
  }
  res.end();
}

// 채팅 화면으로 이동
function chat(req, res) {
  // TODO: session객체에서 nickname을 꺼낸다.
  var nickname = req.session.userid;

  var filename = path.join(views, 'chat.html');
  fs.readFile(filename, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    data = data.toString().replace('<%=nickname%>', nickname);
    res.end(data);
  });
}

function logout(req, res) {
  // TODO: session을 삭제
  req.session.destory();

  
  res.writeHead(303, {'location': '/'});
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