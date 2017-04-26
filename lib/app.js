const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(bodyParser.json());

const musicians = require('./routes/musicians');


app.use('/api/musicians', musicians);

module.exports = app;