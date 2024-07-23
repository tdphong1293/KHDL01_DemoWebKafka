const jwt = require("jsonwebtoken");
require("dotenv").config;

const strictVerifyToken = (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            throw new Error("No token provided");
        }

        const { userID, username } = jwt.verify(token, process.env.SECRET_KEY);

        req.body = { ...req.body, userID, username };

        return next();
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const optionalVerifyToken = (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) return next();

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.userID = decoded.userID;

        next();
    } catch (err) {
        return next();
    }
};

module.exports = { strictVerifyToken, optionalVerifyToken };
