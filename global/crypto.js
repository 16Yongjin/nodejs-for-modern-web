const crypto = require('crypto');

const shasum = crypto.createHash('sha256');
shasum.update('crypto_hash');
const output = shasum.digest('hex');

console.log('crypto hash :', output);

console.log();

const key = 'No one knows this key';
const input = 'PASSWORD';

const cipher = crypto.createCipher('aes192', key);
cipher.update(input, 'utf8', 'base64');
const cipheredOutput = cipher.final('base64');

const decipher = crypto.createDecipher('aes192', key);
decipher.update(cipheredOutput, 'base64', 'utf8')
const dechiperedOutput = decipher.final('utf8');

console.log('원래 문자열: ', input);
console.log('암호화: ', cipheredOutput);
console.log('암호화 해제: ', dechiperedOutput);
