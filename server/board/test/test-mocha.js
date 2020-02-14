var assert = require('assert');
var upper = require('./upper');
var model = require('../models/board');

var article = {writer: '김철수', title: 'mocha 테스트', content: '김철수 만세'};

// Test Suite
describe('# upper 함수 테스트', function() {
  describe.skip('# upper Sync Test', function() {
    // Unit Test
    it('sync(hello, 2)', function() {
      assert(upper.sync('hello', 2) == 'L');
    });
    it('sync(hello, 5)', function() {
      assert(upper.sync('hello', 5) == null);
    });
    it('sync(hello, 0)', function() {
      assert.equal(upper.sync('hello', 0), 'H');
    });
  });

  describe('# upper Async Test', function() {
    // Unit Test
    it('async(hello, 2)', function(done) {
      upper.async('hello', 2, function(result) {
        assert(result == 'L');
        done();
      });
    });
    it('async(hello, 5)', function(done) {
      upper.async('hello', 5, function(result) {
        assert(result == null);
        done();
      });
    });
    it('async(hello, 0)', function(done) {
      upper.async('hello', 0, function(result) {
        assert(result == 'H');
        done();
      });
    });
  });

  
});


var newNo;
// describe.only(...) << 이 Test만 진행
describe.only('# 게시판 DB 테스트', function() {
  // 사전 작업 정의
  before(function(done) {
    this.timeout(3500);
    setTimeout(done, 3000);
  });

  var oldList;
  before(function(done) {
    model.list(function(newList) {
        oldList = newList;
        done();
    })
  });

  // 사후 작업 정의
  after(function() {
    model.dbClose();
  });

  describe("등록", function() {
    it('등록 요청', function(done) {
      model.create(article, function(no) {
        assert.equal(typeof no, 'number');
        newNo = no;
        // console.log(article);

        done();
      });
    });
    it('등록된 게시물 조회', function(done) {
      model.show(newNo, function(newArticle) {
        // console.log(article);
        // assert.equal(newArticle.writer, article.writer);
        // assert.equal(newArticle.title, article.title);
        // assert.equal(newArticle.content, article.content);
        assert.deepEqual(newArticle, article);
        done();
      })
    });
  });

  describe("삭제", function() {
    it('삭제 요청', function(done) {
      model.remove(newNo, done);
    });

    it('목록 조회', function(done) {
      model.list(function(newList) {
        assert.deepEqual(newList, oldList);
        done();
      });
    });
  });
});
