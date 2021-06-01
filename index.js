require("dotenv").config()
const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT
const user = []

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html')
});

io.on('connection', (socket) => {
    const userName = socket.handshake.query.user
    console.log(`${userName} подключился к чату`)
    user.push(socket.handshake.query)
    io.emit('user act', user)

    socket.on('disconnect', (reason) => {
        user.splice(user.indexOf(socket.handshake.query), 1)
        console.log(`${userName} вышел из чата`)
        io.emit('user act', user)
    });
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    });
});

http.listen(port, () => {
    console.log(`Socket.IO стартовал по адресу http://localhost:${port}/`)
});