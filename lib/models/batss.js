const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: 
      type: String,
      required: true,
    },
    fangs: {
      type: Number,
      required: true,
      min: 2,
      max: 1000,
    }
})