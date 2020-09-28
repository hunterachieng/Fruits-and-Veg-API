const express = require('express');

const router = express.Router();

const fruitControllers = require('../controllers/fruit_controllers');

const authControllers = require('../controllers/auth_controllers');

router
    .route('/')
    .get(fruitControllers.getAllFruits)
    .post(authControllers.routeProtect, fruitControllers.createFruit);

router
    .route('/:id')
    .get(fruitControllers.getOneFruit)
    .patch(authControllers.routeProtect, fruitControllers.updateFruit)
    .delete(authControllers.routeProtect, fruitControllers.deleteFruit);

module.exports = router;
