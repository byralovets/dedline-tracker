const crypto = require('crypto');

const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    title: {
        type: String
    },
    authorId: {
        type: String
    },
    description: {
        type: String,
    },
    creationDate: {
        type: String,
        default: Date.now
    },
    expirationDate: {
        type: String
    },
    linkToFile: {
        type: String
    }
});

exports.Deadline = mongoose.model('Deadline', schema);