const url = require('url');
const fs = require('fs');
const path = require('path');

const views = path.join(__dirname, '..', 'views');

function login(req, res) {

}

// 채팅 화면으로 이동
function chat(req, res) {
  // Redirection
  // res.writeHead(303, {'location': '/chat.html'});
  // res.end();

  var nickname = url.parse(req.url, true).query.username;
  var filename = path.join(views, 'chat.html');
  fs.readFile(filename, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    data = data.toString().replace('<%=nickname%>', nickname);
    res.end(data);
  });
}

function logout(req, res) {

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