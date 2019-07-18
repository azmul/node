const EventEmitter = require('events');
const Logger = require('./logger');

const logger = new Logger();
logger.on('messagehndle', (arg) => {
    console.log('Hello', arg);
});
logger.log('Hello msg');

