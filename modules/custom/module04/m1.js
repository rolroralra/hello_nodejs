console.log('Class 를 exports 하는 Module');
// module.exports = class {
//   constructor(kor, eng) {
//     this.kor = kor;
//     this.eng = eng;
//   }

//   sum() {
//     return this.kor + this.eng;
//   }

//   avg() {
//     return this.sum() / 2;
//   }
// };


module.exports = {
  Score: class {
      constructor(kor, eng) {
        this.kor = kor;
        this.eng = eng;
      }
    
      sum() {
        return this.kor + this.eng;
      }
    
      avg() {
        return this.sum() / 2;
      }
    }
};