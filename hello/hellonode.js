function hello(msg) {
  return 'Hello ' + msg;
}

console.log(hello('Node'));

// require 메서드의 리턴값으로 사용됨!
// module.export = {}; // Default
module.exports = hello;