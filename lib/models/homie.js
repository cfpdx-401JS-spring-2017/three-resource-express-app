const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    likes: {
        type: String,
        required: true,
    },
    from: {
        type: String,
    }
});

module.exports = mongoose.model('Homie', schema);