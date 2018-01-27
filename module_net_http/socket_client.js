const net = require('net');

const socket = net.connect(3000, '127.0.0.1', () => {
  console.log('Client start');
});

socket.on('data', (data) => {
  console.log(data.toString());
});

process.stdin.resume();
process.stdin.on('data', (chunk) => {
  socket.write(`ECHO: ${chunk}`);
});
