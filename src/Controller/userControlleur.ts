import { Request, Response, NextFunction } from 'express';
import User from '../database/Mongo/Models/userModel';

// Contrôleur pour la création d'un nouvel utilisateur
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, profilePicId } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'L\'utilisateur existe déjà.' });
    }

    // Créez un nouvel utilisateur
    const newUser = new User({
      username,
      password, // Assurez-vous de stocker le mot de passe de manière sécurisée (hachage, salage, etc.)
      profilePicId,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour la récupération d'un utilisateur par nom d'utilisateur
export const getUserByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour la récupération d'un utilisateur par ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour la récupération de plusieurs utilisateurs par ID
export const getUsersByIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;
    const users = await User.find({ _id: { $in: ids } });

    res.json(users);
  } catch (error) {
    next(error);
  }
};
