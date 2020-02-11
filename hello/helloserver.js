// Core Module
const http = require('http');
const fs = require('fs');
const path = require('path');

// Custom Module
const hello = require('./hellonode');

const httpserver = http.createServer(function(req, res) {
  // client의 요청 정보(req)를 분석한 뒤, 응답 메시지(res)를 전송
  // res.writeHead(200);
  // res.end('<h1>Hello HTTP Server</h1>');
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers);


  // 현재 실행된 모듈 기반 __dirname을 통해서 절대경로 설정
  var filename = req.url.substring(1);
  filename = path.join(__dirname, filename);


  // 1. 동기화 방식 함수 호출
  // try {
  //   var data = fs.readFileSync(filename);
  //   res.writeHead(200);
  //   res.end(data);
  // } catch (err) {
  //   res.writeHead(404);
  //   res.end('<h1>' + filename + ' Not Found!</h1>');
  // }

  // 2. 비동기 방식 함수 호출
  fs.readFile(filename, function(err, data){
    if (err) {
      res.writeHead(404);
      res.end('<h1>' + hello(req.url) + ' Not Found!</h1>');
    } else {
      console.log(data.toString());
      res.writeHead(200);
      res.end(data);
    }
  });
});

var port = process.argv[2] || 80;
httpserver.listen(port, function() {
  console.log(__filename + '\nServer Init Complete!');
});