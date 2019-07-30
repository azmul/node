const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res)=> {
    res.end('I am send');
})
const io = socketio(server);

io.on('connection', (socket, req) => {
    socket.emit('welcome', 'welcome message from server');
    socket.on('message', (data) => {
        console.log(data);
    })
})

server.listen(8000);