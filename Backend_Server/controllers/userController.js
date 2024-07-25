const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userController = {};

userController.signup = async (req, res) => {
    const { username, email, password, dateOfBirth } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });

        if (existingUser) {
            return res.sendStatus(409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            dateOfBirth
        });

        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
};

userController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.sendStatus(401);
        }

        const payload = {
            userID: user._id,
            username: user.username
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

        return res.sendStatus(201).json({ message: "Đăng nhập thành công", token, user: payload });

    } catch (error) {
        return res.sendStatus(500);
    }
};

module.exports = userController;