process.stdin.pipe(require('net').createConnection(2345, 'localhost'))
             .pipe(process.stdout);