const http = require('http');
const nodeStatic = require('node-static');

const file = new nodeStatic.Server(__dirname);
http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(80);