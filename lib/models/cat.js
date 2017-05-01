const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  legs: {
    type: Number,
    default: 4
  },
  siblings: [String],
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  }
});

module.exports = mongoose.model('Cat', schema);