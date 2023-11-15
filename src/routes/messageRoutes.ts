const express = require('express');
const messageRoutesController = require('./Controller/messageRoutesController');

const messageRoutes = express.Router();

messageRoutes.put('/messages/:id', messageRoutesController.editMessage);
messageRoutes.post('/messages/:id/react', messageRoutesController.reactToMessage);
messageRoutes.delete('/messages/:id', messageRoutesController.deleteMessage);

module.exports = messageRoutes;
