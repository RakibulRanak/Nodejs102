const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation')
const { validate } = require('../utils/validate');

router.post('/', userValidation.createUser(), validate, userController.createUser);
router.get('/:username', userValidation.getUser(), validate, userController.getUser);
router.get('/', userController.getUsers);
router.put('/:username', userValidation.updateUser(), validate, userController.updateUser);
router.delete('/:username', userValidation.deleteUser(), validate, userController.deleteUser);

module.exports = router