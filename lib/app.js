const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const pets = require('./routes/pets');
const kindOfPets = require('./routes/kindOfPets');

app.use('/api/pets', pets);
app.use('api/kindOfPets', kindOfPets);

module.exports = app;
