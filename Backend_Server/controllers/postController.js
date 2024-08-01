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
            userId: authorID, // Assuming you have user info in the request
            userName: authorName,
            postId: newPost._id,
            timestamp: new Date().toISOString()
        })

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
            await Post.updateOne({ _id: postID }, { $inc: { likeCount: -1 } });

            await sendEvent('user-activity', {
                type: 'post_unliked',
                userId: userID,
                postId: postID,
                timestamp: new Date().toISOString()
            })
        }
        else {
            await Like.create({ user: userID, post: postID });
            await Post.updateOne({ _id: postID }, { $inc: { likeCount: 1 } });

            await sendEvent('user-activity', {
                type: 'post_liked',
                userId: userID,
                postId: postID,
                timestamp: new Date().toISOString()
            })
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
        await Post.updateOne({ _id: postID }, { $inc: { commentCount: 1 } });

        await sendEvent('user-activity', {
            type: 'post_commented',
            userId: commenterID,
            userName: commenterName,
            postId: postID,
            text: text,
            timestamp: new Date().toISOString()
        })

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

module.exports = postController;
