const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20
    },
    year: {
        type: Number,
        required: true,
        min: 1950
    },
    actors: [{type: Schema.Types.ObjectId, ref: 'Actor'}],
});

module.exports = mongoose.model('Film', schema);