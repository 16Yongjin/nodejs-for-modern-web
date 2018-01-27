const fs = require('fs');
const pug = require('pug');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const client = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'Company'
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, () => {
  console.log('Server Running at port 3000');
});

app.get('/', (req, res) => {
  fs.readFile('list.pug', 'utf8', (err, data) => {
    if (err) { return res.status(500).send('Internal Server Error.') }

    const fn = pug.compile(data);
    client.query('SELECT * FROM products', (error, results) => {
      res.send(fn({ data: results }));
    });
  });
});

app.get('/delete/:id', (req, res) => {
  client.query('DELETE FROM products WHERE id=?', [req.params.id], () => {
    res.redirect('/');
  })
});

app.get('/insert', (req, res) => {
  fs.readFile('insert.pug', 'utf8', (err, data) => {
    if (err) { return res.status(500).send('Internal Server Error.') }
    const fn = pug.compile(data);
    res.send(fn());
  });
});

app.post('/insert', (req, res) => {
  const { name, modelnumber, series } = req.body;

  client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [
    name, modelnumber, series
  ], () => {
    res.redirect('/');
  })
});

app.get('/edit/:id', (req, res) => {
  fs.readFile('edit.pug', 'utf8', (err, data) => {
    if (err) { return res.status(500).send('Internal Server Error.') }
    
    client.query('SELECT * FROM products WHERE id=?', [
      req.params.id
    ], (error, results) => {
      const fn = pug.compile(data);
      res.send(fn({
        data: results[0]
      }));
    });
  });
});

app.post('/edit/:id', (req, res) => {
  const { name, modelnumber, series } = req.body;
  client.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?', [
    name, modelnumber, series, req.params.id
  ], () => {
    res.redirect('/')
  })
});