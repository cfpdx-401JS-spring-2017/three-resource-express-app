/* CONNECT TO DB */
//Connect to Mongo once here
process.env.MONGODB_URI = 'mongodb://localhost:27017/cafedata-test';
require('../../lib/connect');
const connection = require('mongoose').connection;

//export a small helper for dropping DB
module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};