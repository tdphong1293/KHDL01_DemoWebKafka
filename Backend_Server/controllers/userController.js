const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { sendEvent } = require('../kafka/kafkaConfig');

const userController = {};

userController.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });

        if (existingUser) {
            return res.sendStatus(409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        await sendEvent('user-activity', {
            type: 'user_signup',
            userID: newUser._id,
            timestamp: new Date().toISOString()
        })

        req.app.get('io').emit('userUpdated', { _id: newUser._id });

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
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
            username: user.username,
            isAdmin: user.isAdmin
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);

        await sendEvent('user-activity', {
            type: 'user_login',
            userID: user._id,
            timestamp: new Date().toISOString()
        })

        if (user.isAdmin){
            return res.status(201).json({ message: "Đăng nhập thành công", token, user: payload });
        }

        return res.status(200).json({ message: "Đăng nhập thành công", token, user: payload });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

userController.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

module.exports = userController;