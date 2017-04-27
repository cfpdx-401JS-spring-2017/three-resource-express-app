const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const countries = require('./routes/countries');

app.use('/api/countries', countries);

module.exports = app;