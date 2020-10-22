const express = require('express');

const vegetableControllers = require('../controllers/vegetable_controllers');

const authControllers = require('../controllers/auth_controllers');

const router = express.Router();

router
    .route('/')
    .get(vegetableControllers.getAllVegetables)
    .post(authControllers.verifyToken, vegetableControllers.createVegetable);

router
    .route('/:id')
    .get(vegetableControllers.getOneVegetable)
    .patch(vegetableControllers.updateVegetable)
    .delete(vegetableControllers.deleteVegetable);

module.exports = router;
