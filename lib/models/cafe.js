const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    required: true,
    street: String,
    city: String,
    state: String,
    zip: String
  },
  food: {
    type: Boolean
  }
});

module.exports = mongoose.model('Cafe', schema);