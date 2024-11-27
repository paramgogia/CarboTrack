const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware=require('../middleware/auth')


// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);
// Protected routes
router.post('/carbon-footprint', authMiddleware, userController.addCarbonFootprint);
router.get('/carbon-footprint', authMiddleware, userController.getCarbonFootprint);
router.get('/user', authMiddleware, userController.getUserData);

module.exports = router;