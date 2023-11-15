import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import 'dotenv/config';
const jwt = require('jsonwebtoken');
const UserDatabaseController = require('../../database/Controller/userDatabaseController');


async function createUser(req: Request, res: Response) {
  const { username, password, profilePicId } = req.body;
  try {
    const existingUser = await UserDatabaseController.getUserByName(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà' });
    }
    const hash: string = await bcrypt.hash(req.body.password, 5);
    const newUser = await UserDatabaseController.createUser(username, hash, profilePicId);

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

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
      return res.status(400).json({ error: 'Nom d\'utilisateur incorrect' });
    }


    const pwdCorrect: boolean = await bcrypt.compare(req.body.password, user.password);
    if (!pwdCorrect) {
      return res.status(400).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

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
