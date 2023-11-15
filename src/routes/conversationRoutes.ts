import checkAuth from "../auth";
const express = require('express');
const conversationRoutesController = require('./Controller/conversationRoutesController');
const conversationRoutes = express.Router();

conversationRoutes.post('/conversations/create', checkAuth, conversationRoutesController.createConversation);
conversationRoutes.get('/conversations/', checkAuth, conversationRoutesController.getAllConversations);
conversationRoutes.delete('/conversations/:id', checkAuth, conversationRoutesController.deleteConversation);
conversationRoutes.post('/conversations/see/:id', checkAuth, conversationRoutesController.setConversationSeen);
conversationRoutes.post('/conversations/:id', checkAuth, conversationRoutesController.addMessageToConversation);

module.exports = conversationRoutes;
