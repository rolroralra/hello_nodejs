// Module Loading
const http = require('http');
const app = require('../app');

// http.Server 구동
var server = http.createServer(app);

server.on('listening', function(){
  console.log('HTTP Server Running Completed...');
})

server.listen(80);