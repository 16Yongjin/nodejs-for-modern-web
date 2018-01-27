const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const fs = require('fs')

const seats = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
]

const app = express()
const server = http.createServer(app)
app.get('/', (req, res, next) => {
  fs.readFile('index.html', (err, data) => {
    res.send(data.toString())
  })
})

app.get('/seats', (req, res, next) => {
  res.send(seats)
})

server.listen(3000, () => {
  console.log('Server Running at port 3000')
})

const io = socketio.listen(server)
io.sockets.on('connection', (socket) => {
  socket.on('reserve', (data) => {
    seats[data.y][data.x] = 2
    io.sockets.emit('reserve', data)
  })

  socket.on('cancel', (data) => {
    seats[data.y][data.x] = 1
    io.sockets.emit('cancel', data)
  })
})
