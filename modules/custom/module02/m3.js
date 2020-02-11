console.log('m3 Loading Start...');
console.log(__dirname);
console.log(__filename);

// Module Variable -- Function "require"
require('./m1');


// Module Variable -- Object "require"
// resolve Function
// main Object
// cache Object

// Module Variable -- Object "module"
// id
// parent
// filename (== __filename)
// children
// exports

// console.log('cache: ', require.cache);
// console.log(require.resolve('./m1'));
console.log('main: ', require.main.filename);
console.log('isLibrary: ', require.main === module);
console.log('parent: ', module.parent && module.parent.filename);
console.log('children: ', module.children[0] && module.children[0].filename);

try {
  console.log('test: ', require.cache[require.resolve('./m1')].parent.filename);
} catch (error) {
  
}
console.log('module.id: ', module.id);


console.log('m3 Loading Complete...');

module.exports = {
  'name': 'm3',
  'type': 'object'
};