const express = require('express');
const userRoutesController = require('./Controller/userRoutesController');

const userRoutes = express.Router();

userRoutes.post('/users/signup', userRoutesController.createUser);
userRoutes.post('/users/login', userRoutesController.login);

module.exports = userRoutes;
