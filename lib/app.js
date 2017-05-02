const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());


/* bananas is a http request event listener
(has signature: request, response, next)
AND is the express Router that will call the subroutes */
const bananas = require('./routes/bananas');
const bananaStands = require('./routes/banana-stands');

app.use('/api/bananas', bananas);
app.use('/api/banana-stands', bananaStands);

module.exports = app;