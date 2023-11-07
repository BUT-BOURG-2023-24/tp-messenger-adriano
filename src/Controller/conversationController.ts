import { Request, Response, NextFunction } from 'express';
import Conversation from '../database/Mongo/Models/conversationModel';

// Contrôleur pour la création d'une nouvelle conversation
export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { concernedUsersIds } = req.body;

    const title = ''; // Vous pouvez générer un titre en fonction des participants

    const newConversation = new Conversation({
      participants: concernedUsersIds,
      messages: [],
      title,
      lastUpdate: new Date(),
      seen: {},
    });

    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour la récupération de toutes les conversations d'un utilisateur
export const getAllConversationsForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Assurez-vous d'obtenir l'ID de l'utilisateur actuellement authentifié
    const userId = 'userID'; // Remplacez ceci par la logique d'authentification

    const conversations = await Conversation.find({ participants: userId });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour la suppression d'une conversation
export const deleteConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findByIdAndDelete(id);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation non trouvée.' });
    }

    res.json(conversation);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour marquer une conversation comme vue pour un utilisateur et un message donné
export const setConversationSeenForUserAndMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { messageId } = req.body;

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation non trouvée.' });
    }

    conversation.seen = { ...conversation.seen, [userId]: messageId };
    await conversation.save();

    res.json(conversation);
  } catch (error) {
    next(error);
  }
};
