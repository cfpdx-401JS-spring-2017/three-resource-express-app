const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const pets = require('./routes/cowsroute');

app.use('/api/cows', pets);

module.exports = app;
