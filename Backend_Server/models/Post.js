const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {
        type: String,
        required: true,
        maxLength: [200, "Maximum length for post title is 200 characters"]
    },
    content: {
        type: String,
        required: true,
        maxLength: [3000, "Maximum length for post content is 3000 characters"]
    },
    likeCount: { type: Number, default: 0 },
    edited: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
