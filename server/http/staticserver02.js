// MIME(Mulitpurpose Internet Mail Extensions)
// var mime = {
//   'html': 'text/html',
//   'svg': 'image/svg+xml',
//   'jpg': 'image/jpeg',
//   'png': 'image/png',
//   'gif': 'image/gif',
//   'css': 'text/css',
//   'js': 'application/javascript'
//   // ......
// };

// Module Loading
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');


// 1. http.Server 객체 생성
var server = http.createServer(function(req, res){
  // 3. Client Message Recieve & Send
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers['user-agent']);

  if (req.url == '/') {
    req.url = '/index.html';
  }

  var filename = path.join(__dirname, req.url);
  // Way1. Manual getting MIME Type
  // var extname = path.extname(filename).substring(1);
  // var mimeType = mime[extname];

  // Way2. using mime module
  // mime@1.x.x
  // var mimeType = mime.lookup(filename);
  // mime@2.x.x
  var mimeType = mime.getType(filename) && mime.getType('index.html');

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': mimeType + '; charset=utf-8'});
      res.end('<h1>' + req.url + ' Not Found! 해당 파일이 없습니다.</h1>');
    }
    else {
      res.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
      res.end(data);
    }
  });

});


server.on('listening', function(){
  console.log('HTTP Server Running Completed...');
})

server.listen(80);

