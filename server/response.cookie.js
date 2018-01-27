const http = require('http');

http.createServer((req, res) => {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-Cookie': [
      `breakfast = toast; Expires = ${date.toUTCString()}`, 
      'dinner = chicken'
    ]
  });

  res.end(`<h1>${req.headers.cookie}</h1>`);
}).listen(3000, () => {
  console.log('Server running on port 3000');
});
