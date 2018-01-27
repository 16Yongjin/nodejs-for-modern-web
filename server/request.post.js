const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  if (req.method === 'GET') {
    fs.readFile('HTMLPage2.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    })
  } else if (req.method === 'POST') {
    req.on('data', (data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>${data}</h1>`);
    })
  }
}).listen(3000, () => {
  console.log('Server Running at port 3000');
})

