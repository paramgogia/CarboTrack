// auth.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);

module.exports = router;
