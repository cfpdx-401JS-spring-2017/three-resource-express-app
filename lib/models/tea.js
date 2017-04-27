const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        name: {
            type: String,
            required: true
        },
        processing: {
            harvestMonth: String,
            roasted: Boolean,
        }
    }
});

module.exports = mongoose.model('Tea', schema);