const mongoose = require('mongoose');

const FruitSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Fruit must have a name'],
        minlength: [2, 'Min character for your fruit name is 2'],
        maxlength: [20, 'Max character for your fruit name is 20'],
    },
    description: {
        type: String,
        required: [true, 'A fruit must have description'],
        minlength: [10, 'Min character for fruit description is 10'],
        maxlength: [100, 'Max character for fruit description is 100'],
    },
    color: {
        type: String,
        required: [true, 'A fruit must have color'],
        maxlength: [10, 'Max character for fruit color is 10'],
    },
    vitamins: {
        type: String,
        required: [true, 'A fruit must have vitamins content'],
        maxlength: [20, 'Max character for vitamins is 10'],
    },
    price: {
        type: Number,
        required: [true, 'A fruit must have price'],
    },
    qty: {
        type: Number,
        required: [true, 'A fruit must have stock quantity'],
        maxlength: [5, 'Max character for fruit stock is 5'],
    },
    fruitImage: {
        type: String,
        required: [true, 'A fruit must have image'],
    },
});

const Fruit = mongoose.model('Fruit', FruitSchema);

module.exports = Fruit;
