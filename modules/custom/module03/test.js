var m1 = require('./m1'); // return object
console.log(typeof m1, m1.name, m1.type);

var m2 = require('./m2'); // return function
console.log(typeof m2, m2());

var m3 = require('./m3'); // return function
console.log(typeof m3);
var student1 = m3({kor: 80, eng: 90});
var student2 = m3({kor: 65, eng: 100});

console.log(student1.sum(), student1.avg());
console.log(student2.sum(), student2.avg());


var http = require('./m4');
http.createServer(function(req, res) {

});

var fs = require('./m4');
fs.readFile('hello.html', function(err, data) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(data);
  }
})

var path = require('./m4');
var filePath = path.join(__dirname, 'hello', 'hello.html');
console.log(filePath);


// var logger = require('./m5')();
var logger = require('./m5')({target : 'console'});
// var logger = require('./m5')({target : 'file', filename: 'log.txt'});
logger.log("Task Start...");
logger.log("Task Working...");
logger.log("Task Complete...");

