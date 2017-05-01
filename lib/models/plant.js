const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  variety: String,
  leafy: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Plant', schema);