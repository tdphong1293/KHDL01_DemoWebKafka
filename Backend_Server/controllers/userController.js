const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const getPayload = (user) => {
    return {
        userID: user._id,
        username: user.username
    };
}

const userController = {};

userController.signup = async (req, res) => {
    const { username, email, password, dateOfBirth } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });

        if (existingUser) {
            return res.status(409).json({ error: "Tên đăng nhập hoặc Email đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            dateOfBirth
        });

        return res.status(200).json({ message: "Đăng ký thành công" });
    } catch (error) {
        return res.status(500).json({ error: "Error creating user" });
    }
};

userController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ error: "Sai email hoặc mật khẩu" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({ error: "Sai email hoặc mật khẩu" });
        }

        const payload = getPayload(user);

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

        return res.status(200).json({ message: "Đăng nhập thành công", token, payload });

    } catch (error) {
        return res.status(500).json({ error: "Error log in user" });
    }
};

module.exports = userController;