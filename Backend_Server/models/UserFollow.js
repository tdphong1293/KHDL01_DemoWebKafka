const mongoose = require('mongoose');

const UserFollowSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    following: { type: mongoose.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('UserFollow', UserFollowSchema);
