const express = require('express');
const socket = require('./socket')

const app = express();
const port = process.env.port || 8000;
const expressServer = app.listen(port);
socket(expressServer);