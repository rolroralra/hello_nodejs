const childProcess = require('child_process');

// spawn()으로 쉘을 생성한 후 command를 전송한다.
// 출력이 완료되면 callback 호출.
// exec(command[, options][, callback])
childProcess.exec('dir', function(err, stdoutMsg, stderrMsg) {
  if (err) {
    console.log(err);
  }

  console.log(stdoutMsg);
});



// 지정한 file을 실행한다.
// execFile(file[, args][, options][, callback])
childProcess.execFile('calc', function(err, stdoutMsg, stderrMsg) {
  if (err) {
    console.log(err);
  }

  console.log(stdoutMsg);
});