var childProcess = require('child_process');
var path = require('path');
var fs = require('fs');

// node mymon.js helloserver.js 8080
// => node helloserver.js 8080

var args = process.argv.slice(3);

// 상대경로가 포함된 경로를 절대경로로 변환
var filePath = path.resolve(process.argv[2]);
var fileName = path.basename(filePath);
var child;

// 서버 기동 함수
function runChild() {
  child = childProcess.fork(filePath, args);
  console.log('Running Node ', fileName, args);
  child.on('close', function(code) {
    console.log('stop', fileName);
  });
}

runChild();

// 서버 재기동 함수
function restart() {
  if(child) {
    child.kill();
  }

  setTimeout(runChild, 1000);
}

// server 가동 시킬때의 모듈파일 모니터링 이벤트 핸들러 등록
fs.watchFile(filePath, restart);


// process.stdin 으로 'rs' 입력 받을시, restart 함수 호출
process.stdin.on("data", function(data) {
  console.log('stdin data : ' + data);
  // if (data.toString() == 'rs' + require('os').EOL) {
  if (data.toString().trim() == 'rs') {
    restart();
  }
});