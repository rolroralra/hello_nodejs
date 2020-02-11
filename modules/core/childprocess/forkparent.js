var childProcess = require('child_process');

// fork(modulePath[, args][, options])
// node 전용 프로세스를 실행한다.(stdio: 'inherit')
// spawn()과는 다르게 표준 입출력 장치를 사용할 필요 없이
// 전용 IPC 채널을 만든다.
// fork('forkchild.js') == childProcess.spawn('node.exe', ['forkchild.js'], {stdio: 'inherit'});
var child = childProcess.fork('forkchild.js');
init();

function init() {
  // Parent -> Child
  child.send('Hello Child! I am Parent');

  // Child -> Parent
  child.on('message', function(data) {
    console.log('From Child : ' + data);
  });

  // child.on('error', function(error) {
  //   console.log('From Child : ' + error);
  //   process.stdin.off('data');
  //   // child.channel.close();
  //   child.kill();
  // })

  // stdin -> Parent -> Child
  process.stdin.on('data', (data) => {
    child.send(data.toString());
  });
}


child.on('close', function(code) {
  process.exit(1);
});
child.on('exit', function(exitCode) {
  if (!exitCode) {
    console.log('Child Process Error Thorwn!');
    // child.kill(0);
    // child = childProcess.fork('forkchild.js');
    // init();
  }
});