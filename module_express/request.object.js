const express = require('express');

const app = express();

app.use((req, res) => {
  const agent = req.header('User-Agent')
  
  const name = req.query.name;
  const region = req.query.region;

  return res.send(`<h1>${name} - ${region}</h1>`)

  if (agent.toLocaleLowerCase().match(/chrome/)) {
    res.send('<h1>Hello Chrome .. !</h1>');
  } else {
    res.send('<h1>Hello express .. !</h1>')
  }
});

app.listen(3000, () => {
  console.log('Server Running at port 3000');
});