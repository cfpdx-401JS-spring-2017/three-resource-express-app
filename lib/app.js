const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const musicians = require('./routes/musicians');
const films = require('./routes/films');
const actors = require('./routes/actors');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/musicians', musicians);
app.use('/api/films', films);
app.use('/api/actors', actors);

module.exports = app;