var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect('/board');
});

// 목록 조회
router.get('/board', function(req, res, next) {
  res.render('board/list', { title: 'Express' });
});

// 등록 화면 요청
router.get('/board/new', function(req, res, next) {
  res.render('board/write', { title: 'Express' });
});

// 등록 처리 요청
router.post('/board/new', function(req, res, next) {
  res.render('board/result', { title: 'Express' });
});

// 상세 조회
router.get('/board/:no', function(req, res, next) {
  var no = req.params.no;
  res.render('board/view', { title: 'Express' });
});

// 삭제
router.post('/board/:no', function(req, res, next) {
  var no = req.params.no;
  res.render('board/list', { title: 'Express' });
});

module.exports = router;
