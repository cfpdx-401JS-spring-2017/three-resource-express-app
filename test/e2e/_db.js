/* CONNECT TO DB */
//Connect to Mongo once here
process.env.MONGODB_URI = 'mongodb://localhost:27107/cafes';
require('../../lib/connect');
const connection = require('mongoose').connection;

//export a small helper for dropping DB
module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};