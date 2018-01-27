const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const DummyDB = new (require('./DummyDB'))();

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/user', (req, res) => {
  res.send(DummyDB.get());
});

app.get('/user/:id', (req, res) => {
  res.send(DummyDB.get(req.params.id));
});

app.post('/user', (req, res) => {
  const { name, region } = req.body;

  if (name && region) {
    res.send(DummyDB.insert({ name, region }));
  } else {
    throw new Error('error');
  }
});

app.put('/user/:id', (req, res) => {
  const id = req.params.id;
  const { name, region } = req.body;

  const item = DummyDB.get(id);
  item.name = name || item.name;
  item.region = region || item.region;

  res.send(item);
});

app.delete('/user/:id', (req, res) => {
  res.send(DummyDB.remove(req.params.id));
});

app.listen(3000, () => {
  console.log('Server Running at port 3000');
});
