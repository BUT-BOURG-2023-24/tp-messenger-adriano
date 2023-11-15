const express = require('express');
const conversationRoutesController = require('./Controller/conversationRoutesController');
const conversationRoutes = express.Router();

conversationRoutes.post('/conversations/create', conversationRoutesController.createConversation);
conversationRoutes.get('/conversations/', conversationRoutesController.getAllConversations);
conversationRoutes.delete('/conversations/:id', conversationRoutesController.deleteConversation);
conversationRoutes.post('/conversations/see/:id', conversationRoutesController.setConversationSeen);
conversationRoutes.post('/conversations/:id', conversationRoutesController.addMessageToConversation);

module.exports = conversationRoutes;
