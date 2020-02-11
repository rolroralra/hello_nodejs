const childProcess = require('child_process');

// 지정한 프로세스 실행
// childProcess.spawn('calc');
// childProcess.spawn('notepad');

childProcess.spawn('node', ['spawnchild.js'], {
  stdio: 'inherit'
});