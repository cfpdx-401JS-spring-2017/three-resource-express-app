const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const bananas = require('./routes/bananas');
const bananaStands = require('./routes/banana-stands');
const bluths = require('./routes/bluths');

app.use('/api/bananas', bananas);
app.use('/api/banana-stands', bananaStands);
app.use('/api/bluths', bluths);

module.exports = app;