const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [6, "Độ dài tên đăng nhập phải nằm trong khoảng 6 - 30 ký tự"],
        maxLength: [30, "Độ dài tên đăng nhập phải nằm trong khoảng 6 - 30 ký tự"],
        validate: {
            validator: (str) => {
                return validator.isAlphanumeric(str);
            },
            message: "Tên đăng nhập không được chứa ký tự đặc biệt"
        }
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (str) => {
                return validator.isEmail(str);
            },
            message: "Email không hợp lệ"
        }
    },
    name: {
        type: String,
        minLength: [6, "Độ dài tên phải nằm trong khoảng 6 - 50 ký tự"],
        maxLength: [50, "Độ dài tên phải nằm trong khoảng 6 - 50 ký tự"]
    },
    sex: {
        type: String,
        enum: {
            values: ['Nam', 'Nữ'],
            message: "Giá trị {VALUE} không hợp lệ"
        },
    },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: (date) => {
                return validator.isISO8601(date);
            },
            message: "Ngày tháng năm sinh không hợp lệ"
        }
    },
    biography: {
        type: String,
        default: "",
        maxLength: [250, "Must be at most 250 characters long"],
    },
    followedcount: { type: Number, default: 0 },
    followerscount: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);