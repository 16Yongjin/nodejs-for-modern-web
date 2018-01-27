process.on('exit', (err) => {
  console.log('ㅂㅂ');
});

process.on('uncaughtException', (err) => {
  console.log('예외가 발생했다.');
});

let count = 0;
let test = () => {
  count += 1
  if (count > 3) { return; }

  setTimeout(test, 1000);
  error.error.error();
}

setTimeout(test, 1000);