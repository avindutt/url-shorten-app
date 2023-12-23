const express = require('express');

const router = express.Router();

const shortIdController = require('../controller/short_id_controller');
const authController = require('../controller/auth_controller');
const userController = require('../controller/users_controller');
const passport = require('../config/passport-jwt-strategy');

router.get('/register', userController.register);
router.get('/login', userController.login);

// add passport middleware to the protected route
router.get('/home', userController.home);

router.post('/shorten', shortIdController.shortenUrl);
router.get('/:shortId', shortIdController.redirect);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;