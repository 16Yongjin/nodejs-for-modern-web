const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('short'));
app.use((req, res) => {
  res.send('<h1>Express Basic</h1>');
});

app.listen(3000, () => {
  console.log('Server running at port 3000');
});;;;;;;

