const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

/* Serve up dummy html page for testing */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* Handle socket connections */
io.on('connection', (socket) => {
    console.log(`User '${socket.id}' connected`);

    socket.on('chat-message', function (msg) {
        console.log(`User '${socket.id}' sent msg: '${msg}'`);
        socket.broadcast.emit('chat-message', msg);
    });
});

/* SPin up server */
var port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log(`Chat server listening at http://localhost:${port}`);
});