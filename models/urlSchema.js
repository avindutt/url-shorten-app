const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true,
        unique: true
    }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;