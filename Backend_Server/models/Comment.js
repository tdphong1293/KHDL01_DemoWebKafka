const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: [2000, "Maximum length for comment is 2000 characters"]
    },
    commenterID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commenterName: {type: String, required: true},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    edited: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
