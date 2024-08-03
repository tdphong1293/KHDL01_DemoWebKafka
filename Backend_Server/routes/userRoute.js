const router = require("express").Router();
const userController = require("../controllers/userController");
const { strictVerifyToken } = require("../middleware/jwtauthorize");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/getAllUser", userController.getAllUsers);

module.exports = router;