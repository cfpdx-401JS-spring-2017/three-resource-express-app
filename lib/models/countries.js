const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        enum: ['antartica', 'north america', 'south america', 'africa', 'australia', 'europe', 'asia']
    },
    popular: String
});

module.exports = mongoose.model('Country', schema);