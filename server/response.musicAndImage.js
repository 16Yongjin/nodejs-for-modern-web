const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  fs.readFile('tower.png', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(data);
  });
}).listen(3000, () => {
  console.log('Server Running at port 3000');
})

http.createServer((req, res) => {
  fs.readFile('edm.mp3', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'audio/mp3' });
    res.end(data);
  });
}).listen(3001, () => {
  console.log('Server Running at port 3001');
})
