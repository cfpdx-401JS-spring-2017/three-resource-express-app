const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  legs: {
    type: Number,
    required: true,
    min: 2,
    max: 4,

  }
});

module.exports = mongoose.model('Pet', schema);
