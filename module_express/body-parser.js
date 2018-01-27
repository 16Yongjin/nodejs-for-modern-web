const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// app.use(express.static(__dirname + '/public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  if (req.cookies.auth) {
    res.send('<h1>Login Success</h1>');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  fs.readFile('./login.html', 'utf8', (err, data) => {
    if (err) { return console.log('[Error] Reading File Error'); }
    res.send(data.toString());
  });
});

app.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  console.log(login, password);
  console.log(req.body);

  if (login == 'yj' && password == '123123') {
    res.cookie('auth', true);
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  if (req.cookies.auth) {
    res.cookie('auth', false);
    res.send('<h1>Logout</h1>')
  } else {
    res.redirect('/');
  }
})

app.listen(3000, () => {
  console.log('Server Running at port 3000');
});
