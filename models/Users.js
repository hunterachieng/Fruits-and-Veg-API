const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have name !!'],
        trim: true,
        minlength: [2, 'Min character for user name is 2'],
        maxlength: [20, 'Max character for user name is 20'],
    },
    gender: {
        type: String,
        required: [true, 'User must choose their own gender'],
        enum: ['Male', 'Female', 'Others'],
    },
    email: {
        type: String,
        required: [true, 'Please fill your email !!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please fill with a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please fill the password !!'],
        minlength: [8, 'Required 8 character for your password'],
    },
    userImage: {
        type: String,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
