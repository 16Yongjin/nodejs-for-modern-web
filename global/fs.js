const fs = require('fs');

// 파일을 동기적으로 읽기
// const text = fs.readFileSync('./textFile.txt', 'utf8');
// console.log(text);

// 파일을 비동기적으로 읽기
fs.readFile('./textFile.txt', 'utf8', (err, txt) => {
  console.log(txt);
})

// const data = 'Hello world!';
// 파일을 비동기적으로 쓰기
// fs.writeFile('textFileOtherWrite.txt', data, 'utf8', (err) => {
//   err || console.log('File Writing complete');
// });

// 파일을 동기적으로 쓰기
// fs.writeFileSync('textFileOtherWriteSync.txt', data, 'utf8');
// console.log('WRITE FILE SYNC COMPLETE');

// try {
//   const data = fs.readFileSync('textFile.txt', 'utf8');
//   console.log(data);
// } catch (e) {
//   console.log(e);
// }

// try {
//   fs.writeFileSync('textfile.txt', 'Hello Wrold!', 'utf8');
//   console.log('FILE WRITE COMPLETE');
// } catch (e) {
//   console.log(e);
// }

Boolean(0) || Boolean(NaN) || Boolean('') || Boolean(null) || Boolean(undefined) || console.log('all is false');



