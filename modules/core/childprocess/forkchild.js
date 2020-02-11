const path = require('path');
var filename = path.basename(__filename);
console.log(filename, '실행');

// Parent -> Child

process.on('message', (data) => {
  // Child -> Parent
  process.send('Parent Said that ' + data);
});

setTimeout(() => {
  // process.exit(0);
  undefined_function();
}, 1000);
