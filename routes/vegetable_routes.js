const express = require('express');

const vegetableControllers = require('../controllers/vegetable_controllers');

const authControllers = require('../controllers/auth_controllers');

const router = express.Router();

router
    .route('/')
    .get(vegetableControllers.getAllVegetables)
    .post(authControllers.routeProtect, vegetableControllers.createVegetable);

router
    .route('/:id')
    .get(vegetableControllers.getOneVegetable)
    .patch(authControllers.routeProtect, vegetableControllers.updateVegetable)
    .delete(authControllers.routeProtect, vegetableControllers.deleteVegetable);

module.exports = router;
