const pug = require('pug')
const http = require('http')
const express = require('express')

const client = require('mysql').createConnection({
  user: 'root',
  password: 'password',
  database: 'Location'
})

const app = express()
const server = http.createServer(app)

app.get('/tracker', (req, res) => {
  const fn = pug.compileFile('Tracker.pug')
  res.send(fn())
})

app.get('/observer', (req, res) => {
  const fn = pug.compileFile('Observer.pug')
  res.send(fn())
})

app.get('/showdata', (req, res) => {
  client.query(`SELECT * FROM locations WHERE name=${req.params.name}`, (err, data) => {
    res.send(data)
  })
})

server.listen(3000, () => {
  console.log('Server Running at port 3000')
})

const io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {

  socket.on('join', (data) => {
    socket.join(data)
  })

  socket.on('location', (data) => {
    const { name, latitude, longitude } = data

    client.query(`INSERT INTO locations(name, latitude, longitude, date) VALUES 
      (${name}, ${latitude}, ${longitude}, NOW())`)
    // 위치 저장하고 정보 보냄
    io.sockets.in(name).emit('receive', {
      latitude,
      longitude,
      date: Date.now()
    })
  })
})






