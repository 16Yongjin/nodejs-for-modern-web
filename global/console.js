console.log('안녕하세요, %s', '세상!')

console.time('alpha')

for (let i=1; i<6; i++) {
  console.log(`\u001b[3${i}m`, 'Hello world!')
}

console.log('\u001b[0m')
console.timeEnd('alpha')

