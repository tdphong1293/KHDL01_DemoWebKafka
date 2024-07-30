const router = require("express").Router();
const postController = require("../controllers/postController");
const { strictVerifyToken } = require("../middleware/jwtauthorize");

router.get('/', postController.getPost);
router.post("/create", strictVerifyToken, postController.createPost);
router.post("/:postID/like", strictVerifyToken, postController.likePost);
router.post("/:postID/comments/create", strictVerifyToken, postController.commentPost);
router.get("/:postID/comments", postController.getPostComment);

module.exports = router;