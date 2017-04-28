const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const countries = require('./routes/countries');
const teas = require('./routes/teas');
const teawares = require('./routes/teawares');

app.use('/api/countries', countries);
app.use('/api/teas', teas);
app.use('/api/teawares', teawares);

module.exports = app;