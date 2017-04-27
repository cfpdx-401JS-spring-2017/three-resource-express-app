const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const homies = require('./routes/homies');

app.use('/api/homies', homies);

module.exports = app;