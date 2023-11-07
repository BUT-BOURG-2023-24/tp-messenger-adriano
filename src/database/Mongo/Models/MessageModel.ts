import mongoose, { Document, Schema, Types } from 'mongoose';
import { MongooseID } from "../../../types";

// Interface pour définir la structure des données d'un message
export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  from: Types.ObjectId;
  content: string;
  postedAt: Date;
  replyTo?: Types.ObjectId | null;
  edited: boolean;
  deleted: boolean;
  reactions: Record<string, number>;
}

// Définition du schéma MongoDB pour l'entité "Message"
const messageSchema = new Schema<IMessage>({
  conversationId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Conversation', // Référence à la collection "Conversation"
  },
  from: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User', // Référence à la collection "User"
  },
  content: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  replyTo: {
    type: Types.ObjectId,
    ref: 'Message', // Référence à la collection "Message"
    default: null,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  reactions: {
    type: Map,
    of: Number,
    default: {},
  },
});

// Création du modèle "Message" à partir du schéma
const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;