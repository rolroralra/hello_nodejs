var file = require('fs').createWriteStream('output.txt', {flags:'a'});
require('net').createServer(function(socket) {
  socket.on('error', function() {

  });
  
  // Readable Stream | Pipe | Writable Stream
  socket.pipe(socket);
  socket.pipe(process.stdout);
  socket.pipe(file);
}).listen(2345);