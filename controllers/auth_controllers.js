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

exports.login = async (req, res, next) => {
    try {
        if (req.cookies.user_sid) {
            return res.json({
                status: 'failed',
                message: 'You are already logged in !!',
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.send('There is no user exists');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(400).send('Password are invalids');
        } else {
            req.session.user = user._id;
            res.status(200).json({
                status: 'success',
                message: 'Your login was successfull :)',
            });
        }
    } catch (err) {
        return next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        if (req.session.user && req.cookies.user_sid) {
            /* Unsafe method, maybe later this method will change for security interest */
            res.clearCookie('user_sid');

            res.status(200).json({
                status: 'success',
            });
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Logout failed',
            });
        }
    } catch (err) {
        return next(err);
    }
};
