const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  name: {
    type: String,
    required: true,
    enum: ['George Michael', 'Gob', 'Lucille']
  },
  age: {
    type: Number
  }
});

module.exports = mongoose.model('Bluth', schema);