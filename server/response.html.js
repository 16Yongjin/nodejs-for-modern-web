const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) { return console.log('File Reading Error!'); }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  })
}).listen(3000, () => {
  console.log('Server Running at http://127.0.0.1:3000');
});



