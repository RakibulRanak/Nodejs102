const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation')
const { validate } = require('../utils/validate');
const authController = require('../controllers/authController')

router.post('/login', userController.loginUser);
router.post('/logout', authController.protect, userController.logoutUser);
router.get('/:username', userValidation.getUser(), validate, userController.getUser);
router.put('/changepassword', authController.protect, userValidation.changeUserPassword(), validate, userController.changeUserPassword);
router.put('/', authController.protect, userValidation.updateUser(), validate, userController.updateUser);
router.delete('/', authController.protect, userValidation.deleteUser(), validate, userController.deleteUser);
router.get('/', userController.getUsers);
router.post('/', userValidation.createUser(), validate, userController.createUser);



module.exports = router