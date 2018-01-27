const server = require('http').createServer();

server.on('request', (code) => {
  console.log('Request on');
});

server.on('connection', (code) => {
  console.log('Connection On');
});

server.on('close', (code) => {
  console.log('Close On');
});

server.listen(3000, () => {
  console.log('Server Running at https://127.0.0.1:3000');
});