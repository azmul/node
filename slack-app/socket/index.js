const socketio = require('socket.io');

module.exports = (expressServer) => {
    const io = socketio(expressServer);

    io.on('connection', (socket, req) => {
        socket.emit('messageFromServer', {name: 'Server'}); // send message only him
        socket.broadcast.emit('messageFromServer', 'A new user has joined'); // send msg to all without him
        socket.on('messageToServer', (data) => {
            console.log(data);
        })
        socket.on('messageToAll', data => {
            io.emit('messageSentToAll', data); // send msg to all 
        })
        socket.on('sendLocation', (data, callback) => {
            io.emit('messageFromServer', `https://google.com/maps?q=${data.lat},${data.lng}`);
            callback('Location Shared');
        })
        socket.on('sentSocketId', data => {
            console.log(data);
        })
        socket.on('disconnect', () => {
            console.log(socket.id);
            io.emit('messageFromServer', `${socket.id} user has left`); // send msg to all without him
        })
    })

    io.of('/admin').on('connection', (socket, req) => {
        socket.emit('messageFromServer', {name: 'Server'});
        socket.on('messageToServer', (data) => {
            console.log(data);
        })
        socket.on('messageToAll', data => {
            io.emit('messageSentToAll', data);
        })
    })

}