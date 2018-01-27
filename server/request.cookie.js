const http = require('http');

http.createServer((req, res) => {
  if (req.headers.cookie) {
    const cookie = req.headers.cookie.split(';').map((i) => {
      i = i.split('=')
      return {
        key: i[0],
        value: i[1]
      }
    })

    res.end(`<h1>${JSON.stringify(cookie)}</h1>`);
  } else { 
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': ['name = RintIanTta', 'region = Seoul']
    });

    res.end('<h1>쿠키를 생성했습니다.</h1>');
  }
    
}).listen(3000, () => {
  console.log('Server Running at port 3000');
});