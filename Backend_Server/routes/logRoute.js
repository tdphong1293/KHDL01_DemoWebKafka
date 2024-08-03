const router = require("express").Router();
const logController = require("../controllers/logController");

router.get('/', logController.getLog);

module.exports = router;
