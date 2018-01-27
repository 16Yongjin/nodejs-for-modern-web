const http = require('http');
const fs = require('fs');
const jade = require('jade');

http.createServer((req, res) => {
  fs.readFile('./jadePage.jade', 'utf8', (err, data) => {
    const fn = jade.compile(data);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fn({
      name: 'RIntIanTta',
      description: 'Hello Jade with Node.js .. !'
    }));
  });
}).listen(3000, () => console.log('Server Running at port 3000'))



