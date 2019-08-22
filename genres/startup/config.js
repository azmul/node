const config = require('config');
const chalk = require('chalk');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        throw new Error(chalk.bold.red("FATAL ERROR: jwtPrivateKey not included"));
    }
}