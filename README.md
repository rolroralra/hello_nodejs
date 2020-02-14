# hello_nodejs
Hello Node.js

# npm (Node Package Manager)
```bash
$ npm init
# package.json, package-lock.json file created 

$ npm install connect
# node_modules directory created

$ npm install -g nodemon
# install nodemon in root node_modules directory

$ npm start
# package.json 내에서 sciprts.start의 명령을 수행

$ npm run start2
# package.json 내에서 sciprts.start2 필드의 명령을 수행
```

# package.json
```json
{
  "name": "nodelab",
  "version": "1.0.0",
  "description": "Hello Node.js",
  "main": "index.js",
  "scripts": {
    "start": "nodemon ./hello/helloserver.js",
    "start2": "nodemon ./hello/helloserver2.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rolroralra/hello_nodejs.git"
  },
  "author": "rolroralra",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/rolroralra/hello_nodejs/issues"
  },
  "homepage": "https://github.com/rolroralra/hello_nodejs#readme",
  "dependencies": {
    "clog": "^0.1.6",
    "connect": "^3.7.0",
    "ejs": "^3.0.1",
    "express-session": "^1.17.0",
    "mime": "^2.4.4",
    "morgan": "^1.9.1",
    "nocache": "^2.1.0",
    "node-static": "^0.7.11",
    "serve-static": "^1.14.1",
    "socket.io": "^2.3.0",
    "tracer": "^1.0.2"
  }
}
```
# http Module, connect Module
Web Server 개발시, 일반적으로 처리해야할 작업
1. Logging
2. URL Encoding & Decoding
3. POST Method HTTP Request's Body Parsing
4. JSON Request Body Parsing
5. Cookie Parsing
6. Static Resource Response
7. Session
8. Dynamic Resource Response
9. File Upload
10. Security (Authentication, Authorization)
11. Error Handling
...

```txt
step1{
  - staticserver.js 에서 http 서버 구동, static 자원 응답, 로깅
  - url parsing 후, 경로와 queryString 분리
}

step2{
  - bin/www.js: http 서버 구동
  - app.js: 추가
}

step3{
  - middleware/static.js: static 자원 응답
  - middleware/logger.js: 로깅
}

step4{
  - connect 미들웨어 컨테이너 사용
  - middleware를 connect 용으로 수정
}

step5{
  - 동적인 자원 요청 처리 (routes 추가)
  - 사용자 인증 처리
}

step6{
  - session, cookie
  - custom middleware 제거
  - connect용 Middleware 교체
  - morgan : logger
  - serve-static : Static Resource Server
  - express-session (Session)
  - ejs : View Engine Render (Embedded JS)
  - nocache : Cache 처리
  - socket.io : WebSocket
}
```

# Express Framework
```bash
$ express board --view=ejs

   create : board\
   create : board\public\
   create : board\public\javascripts\
   create : board\public\images\
   create : board\public\stylesheets\
   create : board\public\stylesheets\style.css
   create : board\routes\
   create : board\routes\index.js
   create : board\routes\users.js
   create : board\views\
   create : board\views\error.ejs
   create : board\views\index.ejs
   create : board\app.js
   create : board\package.json
   create : board\bin\
   create : board\bin\www

   change directory:
     > cd board

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=board:* & npm start
```

# TDD (Test Driven Development)
```bash
$ nps i -g mocha

$ mocha testXXX.js

```