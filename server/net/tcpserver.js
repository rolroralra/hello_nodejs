const net = require('net');


// 1. net.Server 객체 생성
var tcpServer = net.createServer(function(socket){
  console.log('Client Connected...', socket.remoteAddress);

  // 2. error Event 반드시 EventListener 등록해야됨.
  socket.on('error', function() {
    console.log(socket.remoteAddress, 'Connection Closed...');
  });

  // 3. Client Message Recieve & Send
  socket.on('data', function(data) {
    // process.stdout.write(data);
    console.log('Message From Client:', data.toString().trim());
    socket.write(data.toString().trim() + '?');
  });
});

tcpServer.on('listening', function(){
  console.log('TCP Server Running Completed...');
})

tcpServer.listen(1234);