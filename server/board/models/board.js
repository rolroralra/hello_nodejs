// var b1 = {
// 		_id: 0,
// 		title: '첫번째 게시물',
// 		writer: '김철수',
// 		content: '첫번째 게시물 입니다.',
// 		view: 0,
// 		regdate: '2099-06-20 12:34:12'
// };
// var b2 = {
// 		_id: 1,
// 		title: '두번째 게시물',
// 		writer: '이영희',
// 		content: '두번째 게시물 입니다.',
// 		view: 0,
// 		regdate: '2099-06-21 12:54:34'
// };

// var boardList = [b1, b2];

const format = require('date-format');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'boardDB';
 

var db, dbClient;

// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  db = client.db(dbName);
  dbClient = client;
 
  db.board = db.collection('board');
  db.seq = db.collection('seq');

  // client.close();
});


module.exports = {
  // DB Client Close
  dbClose: function() {
    dbClient.close();
  },
	// 게시물 목록 조회
	list: function(callback){
    // TODO: DB에서 목록 조회한 후 결과를 콜백으로 전달
    db.board.find({}, {content: 0}).sort({_id: -1}).toArray(function(err, result) {
      callback(result);
    });

	},
	// 게시물 상세 조회
	show: function(no, callback){
    // TODO: DB에서 no 게시물을 조회한 후 결과를 콜백으로 전달
    // db.board.findOne({_id: no});
    db.board.findOneAndUpdate({_id: no}, {$inc: {view: 1}}, function(err, result) {
      // findOneAndUpdate   result의 경우,  current Value, updated Value 둘다 옴.
      console.log(result.value);
      callback(result.value);
    });
	},
	// 게시물 등록
	create: function(article, callback){
    // TODO: DB에 article을 등록한 후 게시물 번호를 콜백으로 전달
    db.seq.findOneAndUpdate({}, {$inc: {index: 1}}, function(err, result) {
      article._id = result.value.index;
      article.view = 0;
      article.regdate = format.asString('yyyy-MM-dd hh:mm:ss', new Date());

      db.board.insertOne(article, function(err, result) {
        callback(article._id);
      });

    });
	},
	// 게시물 삭제
	remove: function(no, callback){
    // TODO: DB에서 no 게시물을 삭제한 후 콜백 호출
    db.board.remove({_id: no}, callback);
	}
};
