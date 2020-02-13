const url = require('url');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

function staticServer(req, res, next) {
  if (req.url == '/') {
    req.url = '/index.html';
  }
  
  // Using 'url' Core Module
  var parseUrl = url.parse(req.url, true);
  var pathname = parseUrl.pathname
  // var query = parseUrl.query;
  
  var filename = path.join(base, pathname);
  // mime@2.x.x
  var mimeType = mime.getType(filename);

  fs.stat(filename, function(err, status) {
    if (err) {
      // var err = new Error('Static Resource Read Failed!');
      // err.status = 500;
      // next(err);
      next();
    }
    else if (status.isFile()) {
      res.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
      fs.createReadStream(filename).pipe(res);
    }
    else if (status.isDirectory()) {
      // res.writeHead(403, {'Content-Type': 'text/html; charset=utf-8'});
      // res.end('<h1>' + req.url + ' 디렉토리 접근 권한 없음.</h1>');
      var err = new Error('디렉토리 접근 권한 없음.');
      err.status = 403;
      next(err);
    }

  });
}

var base;
function setBase(dir) {
  base = dir;
  return staticServer;
}

module.exports = setBase;