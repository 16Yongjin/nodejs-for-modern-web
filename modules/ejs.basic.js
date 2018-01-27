const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

http.createServer((req, res) => {
  fs.readFile('./ejsPage.ejs', 'utf8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(ejs.render(data, {
      name: 'RintIanTta',
      description: 'Hello ejs with Node.js ..!'
    }));
  });
}).listen(3000, () => console.log('Server Running at port 3000'))



