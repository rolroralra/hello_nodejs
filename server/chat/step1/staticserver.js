// Module Loading
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');


// Logging File
var logfile = fs.createWriteStream('log.txt', {flags: 'a'});

// HTTP Static Request Listener
function staticServer(req, res){
  if (req.url == '/') {
    req.url = '/index.html';
  }

  // Using 'url' Core Module
  var parseUrl = url.parse(req.url, true);
  var pathname = parseUrl.pathname
  var query = parseUrl.query;

  console.log(pathname, query);
  
  var filename = path.join(__dirname, pathname);
  // mime@2.x.x
  var mimeType = mime.getType(filename);
  fs.stat(filename, function(err, status) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      res.end('<h1>' + req.url + ' Not Found! 해당 파일이 없습니다.</h1>');
    }
    else if (status.isFile()) {
      res.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
      fs.createReadStream(filename).pipe(res);
    }
    else if (status.isDirectory()) {
      res.writeHead(403, {'Content-Type': 'text/html; charset=utf-8'});
      res.end('<h1>' + req.url + ' 디렉토리 접근 권한 없음.</h1>');
    }

    // Logging
    // Way1. 수동적 구현
    // logfile.write('[' + Date() + '] ' + res.statusCode + ' ' + req.url);

    // Way2. Template Literal 을 통한 구현
    logfile.write(`[${Date()}] ${res.statusCode} ${req.url}${require('os').EOL}`);
  });
}




// 1. http.Server 객체 생성
var server = http.createServer(staticServer);


server.on('listening', function(){
  console.log('HTTP Server Running Completed...');
})

server.listen(80);

