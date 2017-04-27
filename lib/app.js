const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


//every request coming through will be parsed because it's at the trunk of the tree (top of the file)
//but we can make it more refined by
//Q: when does parse bring together vs when does parse break apart?, how do I know which it does
app.use(morgan('dev'));
app.use(bodyParser.json());

//friends is an http request event listener(has signature: request, response, next) AND is the express Router that will call the subroutes
const homies = require('./routes/homies');
const siblings = require('./routes/siblings');

app.use('/api/homies', homies);
app.use('/api/siblings', siblings); //Q: when we his the api/siblings url, use the CRUD functions in siblings.js?

module.exports = app;