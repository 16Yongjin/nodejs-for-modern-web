const http = require('http');

http.createServer((req, res) => {
  res.writeHead(302, { 
    Location: 'http://google.com'
  })
  res.end();
}).listen(3000, () => {
  console.log('Server Running at port 3000');
})
