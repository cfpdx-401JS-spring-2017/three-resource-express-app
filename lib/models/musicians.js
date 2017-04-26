const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        max: 20
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 100
    },
    songs: {
        type: Array,
        required: true,
        min: 1,
        max: 100
    }
});

module.exports = mongoose.model('Musicians', schema);