const express = require('express');

const router = express.Router();

const fruitControllers = require('../controllers/fruit_controllers');

router
    .route('/')
    .get(fruitControllers.getAllFruits)
    .post(fruitControllers.createFruit);

router
    .route('/:id')
    .get(fruitControllers.getOneFruit)
    .patch(fruitControllers.updateFruit)
    .delete(fruitControllers.deleteFruit);

module.exports = router;
