//1. Create a web server
const router = require('./router')
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  router.css(request,response);
  router.home(request,response);
  router.user(request,response);
  //response.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
