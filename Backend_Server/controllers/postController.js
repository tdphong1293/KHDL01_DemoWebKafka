const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");

const postController = {};

postController.createPost = async (req, res) => {
    const { authorID, authorName, content } = req.body;
    try {
        await Post.create({
            authorID,
            authorName,
            content
        });
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
    const { user } = req.body;
    const { postID } = req.params;

    try {
        const likeCheck = await Like.findOne({ user, post: postID });
        if (likeCheck) {
            await Like.deleteOne({ user, post: postID });
            await Post.updateOne({ _id: postID }, { $inc: { likeCount: -1 } });
        }
        else {
            await Like.create({ user, post: postID });
            await Post.updateOne({ _id: postID }, { $inc: { likeCount: 1 } });
        }

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

postController.getPostComment = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { postID } = req.params;

    try {
        const comments = await Comment.find({ post: postID })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

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
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

module.exports = postController;
