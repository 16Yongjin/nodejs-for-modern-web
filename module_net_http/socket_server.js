const net = require('net');

net.createServer((socket) => {
  socket.on('data',  (data) => {
   console.log(data.toString('utf8'));
   socket.write(data);
  });
}).listen(3000, () => {
  console.log('Server Running at port 3000')
});