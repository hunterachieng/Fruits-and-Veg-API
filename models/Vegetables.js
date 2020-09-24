const mongoose = require('mongoose');

const VegetableSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vegetable must have a name !'],
        maxlength: [30, 'Max amount for your vegetable character is 30'],
    },
    description: {
        type: String,
        required: [true, 'Give description for your vegetable !'],
        minlength: [10, 'Min character for your vegetable description is 10'],
        maxlength: [100, 'Max character for your vegetable description is 50'],
    },
    color: {
        type: String,
        required: [true, 'Vegetable must have color'],
        maxlength: [10, 'Max character for your veggie color is 10'],
    },
    price: {
        type: Number,
        required: [true, 'Vegetable must have price'],
    },
    qty: {
        type: Number,
        maxlength: 4,
        required: [true, 'Give stock for your vegetable'],
    },
    veggieImage: {
        type: String,
        required: [true, 'Vegetable must have image'],
    },
});

const Vegetable = mongoose.model('Vegetable', VegetableSchema);

module.exports = Vegetable;
