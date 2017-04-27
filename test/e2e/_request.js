//Q: does this file allow us to make http requests?
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../lib/app'); //Q: why do we have to require app here?

module.exports = chai.request(app);