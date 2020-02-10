var m1 = require('./m1');

// require Module 우선순위
// 1. id > id.js > id.json > id.node
// 2. directory로 인식한 뒤에, package.json 내 main 필드 파일
// 3. 해당 directory내 index > index.js > index.json > index.node
var m2 = require('./m2');

console.log(m1);
console.log(m2);