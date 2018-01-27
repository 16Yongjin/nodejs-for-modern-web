const express = require('express');
const router = express.Router();
const client = require('../models/company');


router.get('/', (req, res) => {
  client.query('SELECT * FROM products', (err, data) => {
    res.render('product', {
      title: 'Product Page',
      data
    });
  });
});

router.get('/insert', (req, res) => {
  res.render('product/insert', {
    title: 'Insert Page'
  });
});

router.post('/insert', (req, res) => {
  const { name, modelnumber, series } = req.body;
  client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [
    name, modelnumber, series], () => {
      res.redirect('/product');
    });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM products WHERE id = ?', [id], (err, data) => {

    res.render('product/edit', {
      title: 'Edit Page',
      data: data[0]
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { name, modelnumber, series } = req.body;
  
  client.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?', [
    name, modelnumber, series, id
  ], () => {
    res.redirect('/product');
  });
});

router.get('/delete/:id', (req, res) => {
  const id = req.params.id;  
  client.query('DELETE FROM products WHERE id=?', [id], () => {
    res.redirect('/product');
  })
})


module.exports = router;
