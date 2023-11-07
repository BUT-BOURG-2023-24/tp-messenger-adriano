import mongoose, { Document, Schema } from 'mongoose';
import { MongooseID } from "../../../types";

// Interface pour définir la structure des données d'un utilisateur
export interface IUser extends Document {
  username: string;
  password: string;
  profilePicId: string;
}

// Définition du schéma MongoDB pour l'entité "User"
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicId: {
    type: String,
    // Autres propriétés du schéma liées à profilePicId
  },
});

// Création du modèle "User" à partir du schéma
const User = mongoose.model<IUser>('User', userSchema);

export default User;