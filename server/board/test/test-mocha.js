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
