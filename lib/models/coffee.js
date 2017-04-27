const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  roast: {
    type: String,
    required: true
  },
  flavor: {
    type: String,
    enum: ['strong', 'gross', 'burnt', 'creamy', 'chocolatey']
  }
});

module.exports = mongoose.model('Coffee', schema);