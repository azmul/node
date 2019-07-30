const socketio = require('socket.io');
const _ = require('lodash');

module.exports = (expressServer) => {
    const io = socketio(expressServer);
    let users = [];
    io.on('connection', (socket, req) => {
        // send message only him
        socket.emit('messageFromServer', {name: 'Server'}); 

        // send msg to all without him
        socket.broadcast.emit('messageFromServer', 'A new user has joined');

        socket.on('messageToServer', (data) => {
            // console.log(data);
        })

        // send msg to all
        socket.on('messageToAll', data => {
            io.emit('messageSentToAll', data);  
        })
        socket.on('sendLocation', (data, callback) => {
            io.emit('messageFromServer', `https://google.com/maps?q=${data.lat},${data.lng}`);
            callback('Location Shared');
        })
        // When one user will come in online then socket id will be saved
        // Send a message to all user of current user on status
        socket.on('sentSocketId', data => {
            users.push(data);
            io.emit('currentUserSentToClient', users);
        })

        // Chat will be on for aparticular user
        socket.on('chatWithParticularUser', (data) => {
            console.log(data);
            io.to(`${data.userTwo.socketId}`).emit('currentUserChatOn', true);
            io.to(`${data.userOne.socketId}`).emit('twoUsersInfo', data);
            io.to(`${data.userTwo.socketId}`).emit('twoUsersInfo', data);
        })
        // messages ctach from server
        socket.on('chatMessagesToServer', data => {
            const info = {message: data.message, name: data.userOne.name}
            io.to(`${data.userOne.socketId}`).emit('chatMessagesToClient', info);
            io.to(`${data.userTwo.socketId}`).emit('chatMessagesToClient', info);
        })
        // When one user will left from online then socket id will be removed and 
        // Send a message to all user of current user left status
        socket.on('disconnect', () => {
            users = users.filter(user => user.socketId !== socket.id);
            io.emit('currentUserSentToClient', users);
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