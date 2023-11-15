import { Request, Response } from "express";
const Joi = require('joi');
const ConversationDatabaseController = require('../../database/Controller/conversationDatabaseController');



async function createConversation(req:Request, res:Response) {
  const { concernedUsersIds } = req.body;

  try {
    const newConversation = await ConversationDatabaseController.createConversation(concernedUsersIds);

    res.status(200).json({ conversation: newConversation });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la conversation' });
  }
};

async function getAllConversations(req:Request, res:Response) {
  try {
    const conversations = await ConversationDatabaseController.getAllConversations();

    res.status(200).json({ conversations });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des conversations' });
  }
};

async function deleteConversation(req:Request, res:Response) {
  const conversationId = req.params.id;

  try {
    const deletedConversation = await ConversationDatabaseController.deleteConversation(conversationId);

    res.status(200).json({ conversation: deletedConversation });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la conversation' });
  }
};

async function setConversationSeen(req:Request, res:Response) {
  const { messageId } = req.body;
  const conversationId = req.params.id;

  try {
    const updatedConversation = await ConversationDatabaseController.setConversationSeen(conversationId, messageId);

    res.status(200).json({ conversation: updatedConversation });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la conversation' });
  }
};

async function addMessageToConversation(req:Request, res:Response) {
  const { content, messageReplyId } = req.body;
  const conversationId = req.params.id;

  try {
    const newMessage = await ConversationDatabaseController.addMessageToConversation(conversationId, content, messageReplyId);

    res.status(200).json({ conversation: newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du message à la conversation' });
  }
};

module.exports = { createConversation, getAllConversations, deleteConversation,  setConversationSeen, addMessageToConversation};