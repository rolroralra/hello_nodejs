var http = require('http');
var fs = require('fs');
var os = require('os');

function writeNumbers(res) {
  var counter = 0;

  for (var i = 0; i < 100; i++) {
    counter++;
    res.write(counter.toString() + os.EOL);
  }
}


var port = 80;
http.createServer(function(req, res) {
  var query = require('url').parse(req.url).query;
  var app = require('querystring').parse(query).file + '.html';

  res.writeHead(200, {'Content-Type': 'text/plain'});

  writeNumbers(res);

  setTimeout(function() {
    console.log('opening', app);
    
    fs.readFile(app, function(err, data) {
      if (err) {
        res.write('Could not find or open file for reading' + os.EOL);
      }
      else {
        res.write(data);
      }
      res.end();
    });
  }, 2000);
}).listen(port, console.log('Server Running Completed...', port));