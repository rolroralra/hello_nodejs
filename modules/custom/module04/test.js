var m1 = require('./m1'); // return class
var student1 = new m1.Score(100, 90);
var student2 = new m1.Score(80, 70);

console.log(student1.sum(), student1.avg());
console.log(student2.sum(), student2.avg());