const url = require('url');
// const queryString = require('querystring');

const parsedObject = url.parse('http://www.hanbit.co.kr/store/books/look.php?p_code=B6832340619')

console.log(parsedObject);

// console.log(queryString.parse(parsedObject.query));