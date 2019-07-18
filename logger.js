const EventEmitter = require('events');

class Logger extends EventEmitter{
    log(msg) {
       console.log(msg);
       this.emit('messagehndle', {id:1, name:'azmul'});
    } 
}

module.exports = Logger;