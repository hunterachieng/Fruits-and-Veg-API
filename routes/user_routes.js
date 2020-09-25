const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user_controllers');

router.route('/').get(userControllers.getAllUsers);

router
    .route('/:id')
    .get(userControllers.getOneUser)
    .delete(userControllers.deleteUser);

module.exports = router;
