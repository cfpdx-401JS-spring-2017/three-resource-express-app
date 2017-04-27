const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const cookies = require('./routes/cookies');
const coffees = require('./routes/coffees');

app.use('/api/cookies', cookies);
app.use('/api/coffees', coffees);

module.exports = app;