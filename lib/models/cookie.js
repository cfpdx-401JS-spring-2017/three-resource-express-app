const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  flavor: {
    type: String,
    required: true,
    enum: [
      'chocolate chip',
      'oatmeal',
      'macadamian',
      'peanut butter',
      'ginger',
      'frosted animal']
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

module.exports = mongoose.model('Cookie', schema);