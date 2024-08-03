const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    type: String,
    userID: String,
    postID: String,
    timestamp: Date,
    text: String,
    details: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Log', LogSchema);