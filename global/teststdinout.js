// 표준 입력 장치로부터 데이터가 입력되면
process.stdin.on('data', function(data) {
  // 표준 출력 장치로 출력
  // Way1
  // process.stdout.write(data)
  // process.stdout.write(require('os').EOL);

  // Way2
  // process.stdout.write(data.toString() + require('os').EOL);

  // Way3
  console.log(data.toString());
});


process.stdin.emit('data', '수동으로 이벤트를 발생');