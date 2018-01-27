const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(3000, () => {
  console.log('Server Running at port 3000');
});

let id = 0;
const io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  id = socket.id;
  socket.on('coffee', (data) => {
    console.log('Client Send Data', data);
    // socket.emit('bucks', data);
    // io.sockets.emit('bucks', data);
    // socket.broadcast.emit('bucks', data);
    io.sockets.to(id).emit('bucks', data);
    
  })
})
