// Core Module
const http = require('http');
const fs = require('fs');
const path = require('path');

// Custom Module
const hello = require('./hellonode');


// HTTP Server Custom RequestListener Implementation
function myRequestLisetner(req, res) {
  // client의 요청 정보(req)를 분석한 뒤, 응답 메시지(res)를 전송
  // res.writeHead(200);
  // res.end('<h1>Hello HTTP Server</h1>');
  console.log(req.method, req.url, req.httpVersion);
  // console.log(req.headers);


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
  // fs.readFile(filename, function(err, data){
  //   if (err) {
  //     res.writeHead(404);
  //     res.end('<h1>' + hello(req.url) + ' Not Found!</h1>');
  //   } else {
  //     // console.log(data.toString());
  //     console.log(data.length);
  //     res.writeHead(200);
  //     res.end(data);
  //   }
  // });


  // 3. Stream Class 를 이용한 구현
  var fileStream = fs.createReadStream(filename, {highWaterMark: 1024*8});
  fileStream.on('open', function(fd) {
    res.writeHead(200);
  });

  fileStream.on('error', function() {
    res.writeHead(404);
    res.end('<h1>' + hello(req.url) + ' Not Found!</h1>');
  });

  // fileStream.on('data', function(data) {
  //   console.log(data.length);
  //   res.write(data);
  // });
  fileStream.pipe(res);

  fileStream.on('close', function() {
    res.end();
    console.log('File Stream Reading Completed!')
  });
}


const httpserver = http.createServer();
httpserver.on('request', myRequestLisetner);

var port = process.argv[2] || 80;

// httpserver.listen(port, function() {
//   console.log(__filename + '\nServer Running Complete!');
// });

httpserver.on('listening', function() {
  console.log(__filename + '\nServer Running Complete!', port);
});
httpserver.on('error', function(error) {
  console.log(__filename + '\nServer Running Failed!', port);
  console.error(error.message);
  httpserver.listen(++port);
});

httpserver.listen(port);