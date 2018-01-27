const express = require('express');

const app = express();

app.get('/page/:id', (req, res) => {
  const name = req.params.id;
  res.send(`<h1> ${name} </h1>`)
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Error - Page Not Found</h1>');
})

app.listen(3000, () => {
  console.log('Server Running at port 3000');
});   
