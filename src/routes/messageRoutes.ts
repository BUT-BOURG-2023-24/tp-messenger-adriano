import checkAuth from "../auth";
const express = require('express');
const messageRoutesController = require('./Controller/messageRoutesController');

const messageRoutes = express.Router();

messageRoutes.put('/messages/:id', checkAuth, messageRoutesController.editMessage);
messageRoutes.post('/messages/:id/react', checkAuth, messageRoutesController.reactToMessage);
messageRoutes.delete('/messages/:id', checkAuth, messageRoutesController.deleteMessage);

module.exports = messageRoutes;
