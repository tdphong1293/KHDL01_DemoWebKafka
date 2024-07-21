const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

module.exports = mongoose.model('Like', LikeSchema);
