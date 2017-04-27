process.env.MONDODB_URI = 'mongodb://localhost:27017/somePet-test';
require('../../lib/connect');
const connection = require('mongoose').connection;

module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};
