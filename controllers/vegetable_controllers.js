const Vegetable = require('../models/Vegetables');

exports.getAllVegetables = async (req, res, next) => {
    try {
        const vegetables = await Vegetable.find();

        res.status(200).json({
            status: 'success',
            count: vegetables.length,
            data: vegetables,
        });
    } catch (error) {
        return next(err);
    }
};

exports.getOneVegetable = async (req, res, next) => {
    try {
        const vegetable = await Vegetable.findById(req.params.id);

        if (!vegetable) {
            return res.status(400).send('There is no vegetable exists');
        }

        res.status(200).json({
            status: 'success',
            data: vegetable,
        });
    } catch (error) {
        return next(err);
    }
};

exports.createVegetable = async (req, res, next) => {
    try {
        const vegetable = await Vegetable.create(req.body);

        res.status(201).json({
            status: 'success',
            data: vegetable,
        });
    } catch (err) {
        return next(err);
    }
};

exports.updateVegetable = async (req, res, next) => {
    try {
        const vegetable = await Vegetable.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!vegetable) {
            return res
                .status(400)
                .send('There is no vegetable exists with that id to update');
        }

        res.status(200).json({
            status: 'success',
            data: vegetable,
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteVegetable = async (req, res, next) => {
    try {
        const vegetable = await Vegetable.findByIdAndDelete(req.params.id);

        if (!vegetable) {
            return res
                .status(400)
                .send('There is no vegetable exists with that id to delete');
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        return next(err);
    }
};
