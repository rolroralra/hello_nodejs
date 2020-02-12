const net = require('net');
const path = require('path');
const fs = require('fs');


// 1. net.Server 객체 생성
var tcpServer = net.createServer(function(socket){
  console.log('Client Connected...', socket.remoteAddress);

  // 2. error Event 반드시 EventListener 등록해야됨.
  socket.on('error', function() {
    console.log(socket.remoteAddress, 'Connection Closed...');
  });

  // 3. Client Message Recieve & Send
  socket.on('data', function(data) {
    console.log(data.toString());
    var req = parseHttpRequest(data.toString());
    console.log(req.method, req.url, req.httpVersion);
    console.log(req.headers['user-agent']);

    if (req.url == '/') {
      req.url = '/index.html';
    }

    var filename = path.join(__dirname, req.url);
    fs.readFile(filename, function(err, data) {
      if (err) {
        socket.write('HTTP/1.1 404 Not Found\r\n');
        socket.write('Content-Type: text/html; charset=utf-8\r\n')
        socket.write('\r\n');
        socket.end('<h1>' + req.url + ' Not Found! 해당 파일이 없습니다.</h1>');
      }
      else {
        socket.write('HTTP/1.1 200 OK\r\n');
        socket.write('\r\n');
        socket.end(data);
      }
    });
  });
});

// HTTP Request Parse
function parseHttpRequest(data) {
  var req = {
    headers: {}
  };

  var arr = data.split('\r\n');
  var startLine = arr.shift().split(' ');
  req.method = startLine[0];
  req.url = startLine[1];
  req.httpVersion = startLine[2];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].trim().length > 0) {
      var header = arr[i].split(':');
      var name = header[0].trim().toLowerCase();
      var value = header[1].trim();
      req.headers[name] = value;
    }
    else {
      break;
    }   
  } 

  return req;
}

// HTTP Request Handler & HTTP Response Creater
function createHttpResponse() {
  var res = {

  };

  return res;
}

tcpServer.on('listening', function(){
  console.log('HTTP Server Running Completed...');
})

tcpServer.listen(80);