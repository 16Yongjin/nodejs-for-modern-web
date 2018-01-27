const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const pug = require('pug')

const app = express()
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  const fn = pug.compileFile('Lobby.pug')
  res.send(fn())
})

app.get('/canvas/:room', (req, res) => {
  const fn = pug.compileFile('Canvas.pug')
  res.send(fn({
    room: req.params.room
  }))
})

app.get('/room', (req, res) => {
  const rooms = Object.keys(io.sockets.adapter.rooms).filter((item) => item.indexOf('/') < 0)
  res.send(rooms)
})

const server = http.createServer(app)
server.listen(3000, () => {
  console.log('Server Running at port 3000')
})

const io = socketio.listen(server)
io.sockets.on('connection', (socket) => {
  let roomId = ''
  socket.on('join', (data) => {
    socket.join(data)
    roomId = data
  })

  socket.on('draw', (data) => {
    io.sockets.in(roomId).emit('line', data)
  })

  socket.on('create_room', (data) => {
    io.sockets.emit('create_room', data.toString())
  })
})




