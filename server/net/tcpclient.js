const net = require('net');
var target = {
  // host: 'localhost',
  // host: '10.4.5.107',
  // host: '10.4.5.100',
  // port: 1234
  host: 'google.com',
  port: 80
};

// 1. Socket 생성
var socket = new net.Socket();

// 2. Server Connection
socket.connect(target.port, target.host, function() {
  console.log('Server Connection Success!', target.host + ':' + target.port);

  // 3. Server Message Send & Recieve
  // socket.write('Hello Server! I am Client...');
  socket.on('data', function(data) {
    console.log('Message From Server:', data.toString().trim());
  });
});

// process.stdin 으로부터 입력받은 Message를 Server로 Send
process.stdin.on('data', function(data) {
  socket.write(data);
})