const express = require('express');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const config = require('config');

const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Mogan Enabled...');
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listing port ${port}...`));

