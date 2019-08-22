const mongoose = require('mongoose');
const winston = require('winston');
const chalk = require('chalk');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useCreateIndex: true })
    .then(()=> winston.info(chalk.bold.green('Mongodb Connected')))
}