const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const mongoose = require('mongoose');
const chalk = require('chalk');

const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
   .then(()=> console.log(chalk.bold.green('Mongodb Connected')))
   .catch(err => console.log(chalk.bold.red(err)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres',genres);
app.use('/', home);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Mogan Enabled...');
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listing port ${port}...`));

