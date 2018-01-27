const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  const pathName = url.parse(req.url).pathname;
  console.log('pathName:', pathName);
  console.log('method:', req.method);
  
  if (pathName === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) { return console.log('Error on Reading File'); }
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (pathName === '/otherPage') {
    fs.readFile('otherPage.html', (err, data) => {
      if (err) { return console.log('Error on Reading File'); }
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
}).listen(3000, () => {
  console.log('Server Running at port 3000');
})


