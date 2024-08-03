const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const { sendEvent } = require('../kafka/kafkaConfig');

const postController = {};

postController.createPost = async (req, res) => {
    const { authorID, authorName, content } = req.body;
    try {
        const newPost = await Post.create({
            authorID,
            authorName,
            content
        });

        await sendEvent('user-activity', {
            type: 'post_created',
            userID: authorID,
            postID: newPost._id,
            timestamp: new Date().toISOString()
        })

        req.app.get('io').emit('postUpdated', { _id: newPost._id });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

postController.getPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 });

        return res.status(200).json(posts);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

postController.likePost = async (req, res) => {
    const { userID } = req.body;
    const { postID } = req.params;

    try {
        const likeCheck = await Like.findOne({ user: userID, post: postID });
        if (likeCheck) {
            await Like.deleteOne({ user: userID, post: postID });
            const post = await Post.findOneAndUpdate({ _id: postID }, { $inc: { likeCount: -1 } }, { new: true });

            await sendEvent('user-activity', {
                type: 'post_unliked',
                userID: userID,
                postID: postID,
                timestamp: new Date().toISOString()
            })

            req.app.get('io').emit('postUpdated', { _id: postID, likeCount: post.likeCount });
        }
        else {
            await Like.create({ user: userID, post: postID });
            const post = await Post.findOneAndUpdate({ _id: postID }, { $inc: { likeCount: 1 } }, { new: true });

            await sendEvent('user-activity', {
                type: 'post_liked',
                userID: userID,
                postID: postID,
                timestamp: new Date().toISOString()
            })

            req.app.get('io').emit('postUpdated', { _id: postID, likeCount: post.likeCount });
        }

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

postController.getPostComment = async (req, res) => {
    const { postID } = req.params;

    try {
        const comments = await Comment.find({ post: postID })
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
};

postController.commentPost = async (req, res) => {
    const { commenterID, commenterName, text } = req.body;
    const { postID } = req.params;

    try {
        await Comment.create({ commenterID, commenterName, post: postID, text });
        const post = await Post.findOneAndUpdate({ _id: postID }, { $inc: { commentCount: 1 } }, { new: true });

        await sendEvent('user-activity', {
            type: 'post_commented',
            userID: commenterID,
            postID: postID,
            text: text,
            timestamp: new Date().toISOString()
        })

        req.app.get('io').emit('postUpdated', { _id: postID, commentCount: post.commentCount });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

module.exports = postController;
