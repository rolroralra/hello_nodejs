// Core Module Loading
var assert = require('assert');

// Custom Module Loading
var upper = require('./upper');

var success = 0;
var fail = 0;
console.log('테스트 시작.');

// way1. 비독립적인 수동 테스트 코드
// var result = upper.sync('hello', 2);
// if(result == 'L'){
//   console.log('1. 통과');
//   success++;
// }else{
//   console.log('1. 실패');
//   fail++;
// }

// var result = upper.sync('hello', 5);
// if(result == null){
//   console.log('2. 통과');
//   success++;
// }else{
//   console.log('2. 실패');
//   fail++;
// }

// Way2. try-catch 구문을 활용한 독립적인 테스트 코드
// try {
//   var result = upper.sync('hello', 5);
//   assert.equal(result, null);
//   console.log('1. 통과');
//   success++;
  
// } catch (error) {
//   console.log('1. 실패');
//   fail++;
// }

// try {
//   var result = upper.sync('hello', 2);
//   assert.equal(result, 'L');
//   console.log('2. 통과');
//   success++;
  
// } catch (error) {
//   console.log('2. 실패');
//   fail++;
// }

// console.log('테스트 종료.');
// console.log('success', success);
// console.log('fail', fail);

// Way3. 비동기 함수 테스트
upper.async('hello', 5, function(result){
  try {
    assert.equal(result, null);
    console.log('1. 통과');
    success++;
    
  } catch (error) {
    console.log('1. 실패');
    fail++;
  }

  upper.async('hello', 2, function(result){
    try {
      assert.equal(result, 'L');
      console.log('2. 통과');
      success++;
      
    } catch (error) {
      console.log('2. 실패');
      fail++;
    }

    console.log('테스트 종료.');
    console.log('success', success);
    console.log('fail', fail);
  });
});


