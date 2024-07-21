const router = require("express").Router();
const userController = require("../controllers/userController");
const { strictVerifyToken } = require("../middleware/jwtauthorize");

router.post("/singup", userController.signup);
router.post("/login", userController.login);

module.exports = router;