const fs = require('fs');

const server = require('http').createServer();
const io = require('socket.io').listen(server);

server.listen(3000, () => {
  console.log('Server Running at port 3000');
});

server.on('request', (req, res) => {
  fs.readFile('index.html', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

var roomName = null;
io.sockets.on('connection', (socket) => {

  socket.on('join', (data) => {
    console.log(data, 'joined');
    roomName = data;
    socket.join(data)
  });

  socket.on('message', (data) => {
    console.log(data);
    console.log(roomName);
    io.sockets.in(roomName).emit('message', 'test');
  })
});


