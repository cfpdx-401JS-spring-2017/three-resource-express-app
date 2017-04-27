const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        age: {
            type: String,
            required: true
        },
        source: String
    }
});

module.exports = mongoose.model('Teaware', schema);