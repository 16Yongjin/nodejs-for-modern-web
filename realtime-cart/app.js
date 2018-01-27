const pug = require('pug')
const http = require('http')
const express = require('express')

let counter = 0

class Product {
  constructor(name, image, price, count) {
    this.index = counter++
    this.name = name
    this.image = image
    this.price = price
    this.count = count
  }
}

const products = [
  new Product('Javascript', 'chrome.png', 28000, 30),
  new Product('Vue.js', 'chrome.png', 30000, 30),
  new Product('Node.js', 'chrome.png', 20000, 30),
  new Product('NPM', 'chrome.png', 30000, 30),
  new Product('Socket.io', 'chrome.png', 8000, 30),
  new Product('NativeScript', 'chrome.png', 18000, 30),
  new Product('Spring', 'chrome.png', 14000, 30),
  new Product('Scala.js', 'chrome.png', 12000, 30),
]


const app = express()
const server = http.createServer(app)

app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  const fn = pug.compileFile('index.pug')
  res.send(fn({ products }))
})

server.listen(3000, () => {
  console.log('Server Running at port 3000')
})

const io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {
  const cart = {}

  const emitCount = (index) => {
    io.sockets.emit('count', {
      index,
      count: products[index].count
    })
  }
  // 카트에 있는 물건 돌려 놓기
  const onReturn = (index) => {
    products[index].count++
    // 타이머 끄기
    clearTimeout(cart[index].timerID)
    // 카트에서 비우기
    delete cart[index]
    // 진열대 수량 다시 채우기
    emitCount(index)
  }
  // 카트에 물건이 담겼을 때
  socket.on('cart', (index) => {
    // 진열대에서 물건 빼서
    products[index].count--
    // 카트에 넣기
    cart[index] = {}
    cart[index].index = index
    cart[index].timerID = setTimeout(() => {
      onReturn(index)
    }, 10 * 60 * 1000)
    // 서버와 클라이언트 동기화
    emitCount(index)
    
  })
  // 구매했을 때
  socket.on('buy', (index) => {
    clearTimeout(cart[index].timerID)

    delete cart[index]

    emitCount(index)    
  })
  // 물건 돌려 놓기
  socket.on('return', (index) => {
    onReturn(index)
  })
})
