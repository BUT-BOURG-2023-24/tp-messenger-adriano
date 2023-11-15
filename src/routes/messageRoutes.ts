const express = require('express');
const messageRoutesController = require('./Controller/messageRoutesController');

const messageRoutes = express.Router();

messageRoutes.put('/:id', messageRoutesController.editMessage);
messageRoutes.post('/:id/react', messageRoutesController.reactToMessage);
messageRoutes.delete('/:id', messageRoutesController.deleteMessage);

module.exports = messageRoutes;
