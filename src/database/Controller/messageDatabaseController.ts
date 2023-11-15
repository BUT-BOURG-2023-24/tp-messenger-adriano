const Message = require('../Mongo/Models/messageModel');


  // Fonction pour créer un message
  async function createMessage(conversationId: any, from: any, content: any, replyTo = null) {
    try {
      const message = new Message({
        conversationId,
        from,
        content,
        replyTo,
        postedAt: new Date(),
        edited: false,
        deleted: false,
        reactions: {},
      });
      await message.save();
      return message;
    } catch (error) {
      throw new Error('Erreur lors de la création du message');
    }
  }

  // Fonction pour éditer un message
  async function editMessage(messageId: any, newMessageContent: any) {
    try {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { content: newMessageContent, edited: true },
        { new: true }
      );
      return message;
    } catch (error) {
      throw new Error('Erreur lors de l\'édition du message');
    }
  }

  // Fonction pour supprimer un message
  async function deleteMessage(messageId: any) {
    try {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { deleted: true },
        { new: true }
      );
      return message;
    } catch (error) {
      throw new Error('Erreur lors de la suppression du message');
    }
  }

  // Fonction pour réagir à un message
  async function reactToMessage(messageId: any, userId: any, reaction: any) {
    try {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { $set: { [`reactions.${userId}`]: reaction } },
        { new: true }
      );
      return message;
    } catch (error) {
      throw new Error('Erreur lors de la réaction au message');
    }
  }

  // Fonction pour récupérer un message par ID
  async function getMessageById(messageId: any) {
    try {
      const message = await Message.findById(messageId);
      return message;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du message par ID');
    }
  }

  // Ajoutez d'autres fonctions nécessaires pour les opérations CRUD des messages


// Exportez la classe pour qu'elle puisse être utilisée ailleurs
module.exports = {createMessage,editMessage,deleteMessage,reactToMessage,getMessageById};
