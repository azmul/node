const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const mongoose = require('mongoose');
const chalk = require('chalk');

const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error(chalk.bold.red("FATAL ERROR: jwtPrivateKey not included"));
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useCreateIndex: true })
   .then(()=> console.log(chalk.bold.green('Mongodb Connected')))
   .catch(err => console.log(chalk.bold.red(err)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/genres',genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listing port ${port}...`));

