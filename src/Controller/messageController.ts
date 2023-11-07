import { Request, Response, NextFunction } from 'express';
import Message from '../database/Mongo/Models/messageModel';

// Contrôleur pour la création d'un nouveau message
export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { conversationId, from, content, replyTo } = req.body;

    const newMessage = new Message({
      conversationId,
      from,
      content,
      replyTo,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour la modification d'un message
export const editMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { newMessageContent } = req.body;

    const message = await Message.findByIdAndUpdate(
      id,
      { content: newMessageContent, edited: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé.' });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour la suppression d'un message
export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé.' });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour ajouter une réaction à un message
export const reactToMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { reaction } = req.body;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé.' });
    }

    if (!message.reactions) {
      message.reactions = {};
    }

    message.reactions[reaction] = (message.reactions[reaction] || 0) + 1;

    await message.save();
    res.json(message);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour récupérer un message par ID
export const getMessageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé.' });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
};
