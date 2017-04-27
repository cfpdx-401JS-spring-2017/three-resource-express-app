const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const pets = require('./routes/pets');

app.use('/api/pets', pets);

module.exports = app;
