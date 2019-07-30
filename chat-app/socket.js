const socketio = require('socket.io');

module.exports = (expressServer) => {
    const io = socketio(expressServer);

    io.on('connection', (socket, req) => {
        socket.emit('messageFromServer', {name: 'Server'});
        socket.on('messageToServer', (data) => {
            console.log(data);
        })
        socket.on('messageToAll', data => {
            io.emit('messageSentToAll', data);
        })
    })

}