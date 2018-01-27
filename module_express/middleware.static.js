const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<img src="/image.jpg" height="100%" />')
})

app.listen(3000, () => {
  console.log('Server Running at port 3000');
});
