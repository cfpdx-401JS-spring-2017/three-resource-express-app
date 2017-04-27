const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String, minlength: 3,
        required: true,
        enum: ['katie', 'nevin', 'edward']
        ,
    },
    likes: {
        type: [String],
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    }
});

module.exports = mongoose.model('Sibling', schema);