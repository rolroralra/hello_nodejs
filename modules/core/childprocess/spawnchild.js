const path = require('path');
var filename = path.basename(__filename);
console.log(filename, '실행');

// From Parent Process Stdio
process.stdin.on('data', function(data) {
  console.log('[Child Process] : ' + data);
});

