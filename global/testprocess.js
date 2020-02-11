console.log('1. process 시작.');

process.on('exit', (exitStatusCode) => {
  console.log('process 종료 직전에 처리할 작업1: ', exitStatusCode)

  // Exit Event 내에서는 비동기 함수 호출은 불확실하다. 
  // There is some problem!
  // require('fs').writeFile('error.txt', 'Error Thrown! ExitCode: ' + exitStatusCode + require('os').EOL, {flag: 'a'}, () => {
  //   console.log('Error Logging Complete!');
  // });

  // Exit Event 후에는 실제로 프로세스를 종료하기 때문에, 동기 함수 호출을 권장한다.
  require('fs').writeFileSync('error.txt', 'Error Thrown! ExitCode: ' + exitStatusCode + require('os').EOL, {flag: 'a'});
  console.log('Error Logging Complete!');
});
process.on('exit', (exitStatusCode) => {
  console.log('process 종료 직전에 처리할 작업2: ', exitStatusCode)
});
process.on('exit', (exitStatusCode) => {
  console.log('process 종료 직전에 처리할 작업3: ', exitStatusCode)
});



try {
  a();
} catch (error) {
  console.error('[ERROR] ' + error.message);
}

setTimeout(() => {
  console.log('1초 후에 호출')
}, 1000);

console.info('2. process 종료.');