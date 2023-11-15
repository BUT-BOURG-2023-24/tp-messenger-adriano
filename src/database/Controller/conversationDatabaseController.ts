const Conversation = require('../Mongo/Models/conversationModel');


  // Fonction pour créer une conversation
  async function createConversation(participants: any, title: any) {
    try {
      const conversation = new Conversation({
        participants,
        title,
        messages: [],
        lastUpdate: new Date(),
        seen: {},
      });
      await conversation.save();
      return conversation;
    } catch (error) {
      throw new Error('Erreur lors de la création de la conversation');
    }
  }

  // Fonction pour récupérer une conversation par ID
  async function getConversationById(conversationId: any) {
    try {
      const conversation = await Conversation.findById(conversationId);
      return conversation;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de la conversation par ID');
    }
  }

  // Fonction pour récupérer toutes les conversations pour un utilisateur donné
  async function getAllConversationsForUser(userId: any) {
    try {
      const conversations = await Conversation.find({ participants: userId });
      return conversations;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de toutes les conversations pour un utilisateur');
    }
  }

  // Fonction pour ajouter un message à une conversation
  async function addMessageToConversation(conversationId: any, messageId: any) {
    try {
      const conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        {
          $push: { messages: messageId },
          lastUpdate: new Date(),
        },
        { new: true }
      );
      return conversation;
    } catch (error) {
      throw new Error('Erreur lors de l\'ajout du message à la conversation');
    }
  }

  // Fonction pour marquer une conversation comme vue pour un utilisateur et un message donnés
  async function setConversationSeenForUserAndMessage(conversationId: any, userId: any, messageId: any) {
    try {
      const conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        { $set: { [`seen.${userId}`]: messageId }, lastUpdate: new Date() },
        { new: true }
      );
      return conversation;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la conversation comme vue');
    }
  }

  // Fonction pour supprimer une conversation
  async function deleteConversation(conversationId: any) {
    try {
      const conversation = await Conversation.findByIdAndRemove(conversationId);
      return conversation;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la conversation');
    }
  }

  // Ajoutez d'autres fonctions nécessaires pour les opérations CRUD des conversations


// Exportez la classe pour qu'elle puisse être utilisée ailleurs
module.exports = {createConversation,getConversationById,getAllConversationsForUser,addMessageToConversation,setConversationSeenForUserAndMessage,deleteConversation};
