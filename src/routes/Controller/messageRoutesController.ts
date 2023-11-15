import { Request, Response } from "express";
const Joi = require('joi');
const MessageDatabaseController = require('../../database/Mongo/Models/messageDatabaseController');

async function editMessage(req: Request, res: Response) {
    const { newMessageContent } = req.body;
    const messageId = req.params.id;

    try {
        const editedMessage = await MessageDatabaseController.editMessage(messageId, newMessageContent);

        res.status(200).json({ message: editedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'édition du message' });
    }
};

async function reactToMessage(req: Request, res: Response) {
    const { reaction } = req.body;
    const messageId = req.params.id;

    try {
        const reactedMessage = await MessageDatabaseController.reactToMessage(messageId, reaction);

        res.status(200).json({ message: reactedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la réaction au message' });
    }
};

async function deleteMessage(req: Request, res: Response) {
    const messageId = req.params.id;

    try {
        const deletedMessage = await MessageDatabaseController.deleteMessage(messageId);

        res.status(200).json({ message: deletedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du message' });
    }
};

module.exports = { editMessage, reactToMessage, deleteMessage };
