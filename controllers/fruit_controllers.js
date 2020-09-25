const Fruit = require('../models/Fruits');

exports.getAllFruits = async (req, res, next) => {
    try {
        const fruits = await Fruit.find();

        res.status(200).json({
            status: 'success',
            count: fruits.length,
            data: fruits,
        });
    } catch (err) {
        return next(err);
    }
};

exports.getOneFruit = async (req, res, next) => {
    try {
        const fruit = await Fruit.findById(req.params.id);

        if (!fruit) {
            return next('There is no fruit with that id');
        }

        res.status(200).json({
            status: 'success',
            data: fruit,
        });
    } catch (err) {
        return next(err);
    }
};

exports.createFruit = async (req, res, next) => {
    try {
        const fruit = await Fruit.create(req.body);

        res.status(201).json({
            status: 'success',
            data: fruit,
        });
    } catch (err) {
        return next(err);
    }
};

exports.updateFruit = async (req, res, next) => {
    try {
        const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!fruit) {
            return next('There is no fruit with that id to update');
        }

        res.status(200).json({
            status: 'success',
            data: fruit,
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteFruit = async (req, res, next) => {
    try {
        const fruit = await Fruit.findByIdAndDelete(req.params.id);

        if (!fruit) {
            return next('There is no fruit with that id to delete');
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        return next(err);
    }
};
