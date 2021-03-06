const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const error = require('../middleware/error');
const home = require('../routes/home');
const users = require('../routes/users');
const auth = require('../routes/auth');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(helmet());
    app.use(morgan('tiny'));

    app.use('/', home);
    app.use('/api/genres',genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    app.use(error);
}