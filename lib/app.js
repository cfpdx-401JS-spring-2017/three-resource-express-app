const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const cookies = require('./routes/cookies');

app.use('/api/cookies', cookies);

module.exports = app;