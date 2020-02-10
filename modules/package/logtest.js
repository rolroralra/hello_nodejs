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

var tracer = require('tracer').colorConsole();
tracer.log('tracer.log');
tracer.debug('tracer.debug');
tracer.info('tracer.info');
tracer.warn('tracer.warn');
tracer.error('tracer.error');
tracer.trace('tracer.trace');