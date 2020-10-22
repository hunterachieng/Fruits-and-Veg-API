const User = require('../models/Users');
const jwt = require('jsonwebtoken');
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

// exports.login = async (req, res, next) => {
//     try {
//         if (req.cookies.user_sid) {
//             return res.json({
//                 status: 'failed',
//                 message: 'You are already logged in !!',
//             });
//         }

//         const { email, password } = req.body;

//         const user = await User.findOne({ email: email });

//         if (!user) {
//             return res.send('There is no user exists');
//         }

//         const comparePassword = await bcrypt.compare(password, user.password);

//         if (!comparePassword) {
//             return res.status(400).send('Password are invalids');
//         } else {
//             req.session.user = user._id;
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Your login was successfull :)',
//             });
//         }
//     } catch (err) {
//         return next(err);
//     }
// };

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
            return res.send('There is no user exists !');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(400).send('Password are invalid !!');
        }

        req.session.user = user._id;

        const accessToken = jwt.sign(
            { email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.status(200).json({
            status: 'success',
            token: accessToken,
        });
    } catch (err) {
        return res.send(err);
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

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    // FORMAT TOKEN
    // Authorization : Bearer <access_token>
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];

        jwt.verify(
            bearerToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err) {
                    res.status(403).json({
                        status: 'Forbidden',
                        meesage: 'You dont have access to this route !!',
                    });
                }

                req.user = user;
                next();
            }
        );
    } else {
        res.status(403).json({
            status: 'Forbidden',
            meesage: 'You dont have access to this route !!',
        });
    }
};

exports.routeProtect = async (req, res, next) => {
    /* Need to be refactor to check current user id with session that store in cookie */
    // const user = await User.findById(req.session.user);

    if (!req.cookies.user_sid && !req.session.user) {
        return res
            .status(401)
            .send('You are not logged in, Please log in first');
    }
    next();
};
