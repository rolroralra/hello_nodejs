console.log('m3는 인자값을 가지는 함수를 exports 하는 모듈');
var t = module.filename
module.exports = (score) => {
  return {
    'sum': () => score.kor + score.eng,
    'avg': () => (score.kor + score.eng) / 2
  };
};