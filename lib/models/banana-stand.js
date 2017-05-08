const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: String,
    state: String
  }
});

module.exports = mongoose.model('Banana-stand', schema);