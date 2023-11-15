const express = require('express');
const conversationRoutesController = require('./Controller/conversationRoutesController');

const conversationRoutes = express.Router();

conversationRoutes.post('/create', conversationRoutesController.createConversation);
conversationRoutes.get('/', conversationRoutesController.getAllConversations);
conversationRoutes.delete('/:id', conversationRoutesController.deleteConversation);
conversationRoutes.post('/see/:id', conversationRoutesController.setConversationSeen);
conversationRoutes.post('/:id', conversationRoutesController.addMessageToConversation);

module.exports = conversationRoutes;
