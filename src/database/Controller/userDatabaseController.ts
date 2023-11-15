const User = require('../Mongo/Models/userModel');

  // Fonction pour créer un utilisateur
  async function createUser(username: any, password: any, profilePicId: any) {
    try {
      const user = new User({
        username,
        password, // Assurez-vous de stocker le mot de passe de manière sécurisée, par exemple, en utilisant le hachage bcrypt
        profilePicId,
      });
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Erreur lors de la création de l\'utilisateur');
    }
  }

  // Fonction pour récupérer un utilisateur par nom d'utilisateur
  async function getUserByName(username: any) {
    try {
      const user = await User.findOne({ username });
      return user;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de l\'utilisateur par nom d\'utilisateur');
    }
  }

  // Fonction pour récupérer un utilisateur par ID
  async function getUserById(userId: any) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de l\'utilisateur par ID');
    }
  }

  // Fonction pour récupérer plusieurs utilisateurs par IDs
  async function getUsersByIds(userIds: any) {
    try {
      const users = await User.find({ _id: { $in: userIds } });
      return users;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de plusieurs utilisateurs par IDs');
    }
  }

  // Ajoutez d'autres fonctions nécessaires pour les opérations CRUD des utilisateurs


// Exportez la classe pour qu'elle puisse être utilisée ailleurs
module.exports = {createUser,getUserByName,getUserById,getUsersByIds};
