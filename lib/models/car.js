const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  wheels: Number
});

module.exports = mongoose.model('Car', schema);