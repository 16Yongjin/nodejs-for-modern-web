const mysql = require('mysql');

const client = mysql.createConnection({
  user: 'root',
  password: 'dydwls6943',
  database: 'Company'
});

module.exports = client