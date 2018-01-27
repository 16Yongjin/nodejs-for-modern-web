const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
  fs.readFile('HTMLPage.html', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(3000, () => {
  console.log('Serve Running at port 3000');
});

const io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(data);
    io.sockets.emit('message', data);
  })
})




