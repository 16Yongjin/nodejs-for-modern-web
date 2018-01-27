const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/getCookie', (req, res) => {
  res.send(req.cookies);
});

app.get('/setCookie', (req, res) => {
  res.cookie('string', 'cookie', {
    maxAge: 10000,
    secure: true
  });
  res.cookie('json', {
    name: 'cookie',
    property: 'delicious'
  });

  res.redirect('/getCookie');
});

app.listen(3000, () => {
  console.log('Server Running at 3000');
});

