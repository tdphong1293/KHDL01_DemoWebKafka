const jwt = require("jsonwebtoken");
require("dotenv").config;

const strictVerifyToken = (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            throw new Error("No token provided");
        }

        const { userID, username } = jwt.verify(token, process.env.SECRET_KEY);

        return next();
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = { strictVerifyToken };
