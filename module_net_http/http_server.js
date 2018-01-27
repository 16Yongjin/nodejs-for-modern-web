const net = require('net');

net.createServer((socket) => {
  socket.write(
    `HTTP/1.1 200 OK
    Server: RintIanTta Node.js Custom Server
    Content-Type: text/html
    Content-Length: 21

    <h1>Hello World!</h1>`);
  socket.end();
}).listen(3000, () => {
  console.log('Server Running at port 3000')
});