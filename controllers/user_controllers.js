const User = require('../models/Users');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (err) {
        return next(err);
    }
};

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).send('There is no user exists');
        }

        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res
                .status(400)
                .send('There is no user exists with that id to delete');
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        return next(err);
    }
};
