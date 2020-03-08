const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const moment = require('moment');
const logFormat = 'MMM D, YYYY HH:mm:ss';

/* Console formatting reference */
const cF = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",

    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
}

/* Serve up dummy html page for testing */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* Handle socket connections */
io.on('connection', (socket) => {
    console.log(`User '${socket.id}' connected`);

    socket.on('msg-main', (msg) => {
        console.log(`${cF.fgRed}${cF.bgBlack}%s${cF.reset}%s${cF.fgBlue}%s${cF.reset}%s${cF.fgYellow}%s`,
            moment().format(logFormat),
            `: User `,
            socket.id,
            ` sent msg: `,
            msg);
        socket.broadcast.emit('msg-main', msg, socket.id);
    });

    socket.on('msg-private', (msg, targetUser) => {
        console.log(`${cF.fgRed}${cF.bgBlack}%s${cF.reset}%s${cF.fgBlue}%s${cF.reset}%s${cF.fgBlue}%s${cF.reset}%s${cF.fgYellow}%s`,
            moment().format(logFormat),
            `: User `,
            socket.id,
            ` sent pm to user `,
            targetUser,
            `: `,
            msg);
        io.to(targetUser).emit('msg-private', msg, socket.id);
    });
});

/* SPin up server */
var port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log(`Chat server listening at http://localhost:${port}`);
});