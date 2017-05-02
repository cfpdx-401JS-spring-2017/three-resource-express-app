const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  toppings: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

module.exports = mongoose.model('Banana', schema);