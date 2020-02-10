console.log('console.log');
console.debug('console.debug');
console.info('console.info');
console.warn('console.warn');
console.error('console.error');

var clog = require('clog');
clog.configure({'log level': 2});
clog.log('clog.log');
clog.debug('clog.debug');
clog.info('clog.info');
clog.warn('clog.warn');
clog.error('clog.error');