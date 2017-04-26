const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('FOAM');
});
module.exports = app;