console.log('m1은 object를 exports 하는 모듈');
// Way1
// module.exports.name = 'm1';
// module.exports.type = 'Object';

// Way2
// exports.name = 'm1';
// exports.type = 'Object';

// Way3
module.exports = {
  'name': 'm1',
  'type': 'Object'
};

// Wrong Way
// exports Variable is just reference for module.exports
// exports = {
//   'name': 'm1',
//   'type': 'Object'
// };