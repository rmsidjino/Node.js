const http = require('http');

/*
http 모듈의 createServer 메소드를 이용하여 http server 객체를 생성한다.
request 이벤트가 발생하면 HTTP request를 처리하여 response를 반환
createServer 메소드가 반환한 HTTP server 객체의 listen 메소드와 3000이라는 포트번호를 전달하여 서버를 실행한다.
*/

http.createServer((request, response) => {
    response.statusCode =200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World');
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000');