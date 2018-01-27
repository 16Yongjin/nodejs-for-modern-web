var EventEmitter = require('events')

const custom = new EventEmitter();

custom.on('tick', (code) => {
  console.log('이벤트를 발생시킴');
});

custom.emit('tick')
