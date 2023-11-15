const express = require('express');
const userRoutesController = require('./Controller/userRoutesController');

const userRoutes = express.Router();

userRoutes.post('/signup', userRoutesController.createUser);
userRoutes.post('/login', userRoutesController.login);

module.exports = userRoutes;
