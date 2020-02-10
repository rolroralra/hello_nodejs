const http = require('http');
const httpserver = http.createServer(function(req, res) {
  // client의 요청 정보(req)를 분석한 뒤, 응답 메시지(res)를 전송
  res.writeHead(200);
  res.end('<h1>Hello HTTP Server</h1>');
});

httpserver.listen(8080, function() {
  console.log('Server Init Complete!');
});