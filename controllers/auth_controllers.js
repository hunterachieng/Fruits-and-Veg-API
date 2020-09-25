const User = require('../models/Users');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({
                message: 'That user already exists',
            });
        } else {
            const salt = await bcrypt.genSalt(15);

            userPassword = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
                password: userPassword,
                userImage: req.body.userImage,
            });

            res.status(201).json({
                status: 'success',
                data: user,
            });
        }
    } catch (err) {
        return next(err);
    }
};
