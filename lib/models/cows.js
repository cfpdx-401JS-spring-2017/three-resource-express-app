const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: 
      type: String,
      required: true,
    },
    guitars: {
      type: Number,
      required: true,
      min: 4,
      max: 2000,
    }
})