import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const UserDatabaseController = require('../../database/Controller/userDatabaseController');


async function createUser(req: Request, res: Response) {
  const { username, password, profilePicId } = req.body;
  try {
    const existingUser = await UserDatabaseController.getUserByName(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà' });
    }

    const newUser = await UserDatabaseController.createUser(username, password, profilePicId);

    const token = jwt.sign({ userId: newUser._id }, 'secret');

    res.status(200).json({ user: newUser, token, isNewUser: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await UserDatabaseController.getUserByName(username);
    if (!user) {
      return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    // Assurez-vous d'utiliser un processus de hachage sécurisé, par exemple avec bcrypt
    if (user.password !== password) {
      return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret');

    res.status(200).json({ user, token, isNewUser: false });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

async function online(req: Request, res: Response) {
  try {
    const userIds = req.body.userIds;

    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ error: 'IDs d\'utilisateurs manquants ou invalides dans le corps de la requête.' });
    }

    const onlineUsers = await UserDatabaseController.getUsersByIds(userIds);
    return res.status(200).json({ users: onlineUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = { createUser, login, online };
