const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    authorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxLength: [3000, "Maximum length for post content is 3000 characters"]
    },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    edited: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
