import mongoose, { Document, Schema, Types } from 'mongoose';
import { MongooseID } from "../../../types";

// Interface pour définir la structure des données d'une conversation
export interface IConversation extends Document {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
  title: string;
  lastUpdate: Date;
  seen: Record<string, Types.ObjectId>;
}

// Définition du schéma MongoDB pour l'entité "Conversation"
const conversationSchema = new Schema<IConversation>({
  participants: [
    {
      type: Schema.ObjectId,
      ref: 'User', // Référence à la collection "User"
    },
  ],
  messages: [
    {
      type: Schema.ObjectId,
      ref: 'Message', // Référence à la collection "Message"
    },
  ],
  title: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  seen: {
    type: Map,
    of: Types.ObjectId,
    default: {},
  },
});

// Création du modèle "Conversation" à partir du schéma
const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);

export default Conversation;