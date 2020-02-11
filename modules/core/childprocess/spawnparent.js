const childProcess = require('child_process');

// 지정한 프로세스 실행
// childProcess.spawn('calc');
// childProcess.spawn('notepad');

// var child = childProcess.spawn('node', ['spawnchild.js'], {
  // stdio:  자식 프로세스의 표준 입출력 장치를 지정 [stdin, stdout, stderr]
  // stdio: ['inherit', 'inherit', 'inherit']
  // stdio: 'inherit' 

  // 'inherit' : parent process의 stdio 물려받아 사용
  // 'ignore' : 사용 안함
  // 'pipe' : parent process의 stdio를 child process에 pipe로 연결 (Default)
  // stdio: 'pipe'
// });

child = childProcess.spawn('cmd');
child.stdin.write('dir\r\n');

// child = childProcess.spawn('java', ['HelloJava']);

// Child -> Parent
child.stdout.on('data', function(data) {
  console.log('[Child Process] : ' + data);
});

// Parent -> Child
child.stdin.write('Parent Process Start Complete!')

// Stdin -> Parent -> Child 
process.stdin.on("data", (data) => {
  child.stdin.write(data.toString(), () => { console.log("[Parent Process] : Send data to child process complete!"); });
});

