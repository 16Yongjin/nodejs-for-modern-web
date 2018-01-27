const express = require('express');
const fs = require('fs');
const multipart = require('connect-multiparty');

const app = express();

app.use(multipart({ uploadDir: `${__dirname}/multipart` }));

app.get('/', (req, res) => {
  fs.readFile('./HTMLPage.html', (err, data) => {
    if (err) { return console.log('[Error] File Reading Error'); }

    res.send(data.toString());
  });
});

app.post('/', (req, res) => {
  const comment = req.body.comment;
  const imageFile = req.files.image;
  if (imageFile) {
    const { name, path, type } = imageFile;

    if (type.indexOf('image') !== -1 ) {
      const outputPath = `${__dirname}/multipart/${Date.now()}_${name}`
      fs.rename(path, outputPath, (err) => {
        res.redirect('/');
      });
    } else {
      fs.unlink(path, (err) => {
        res.sendStatus(400);
      });
    }
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('Server Running at port 3000');
});
