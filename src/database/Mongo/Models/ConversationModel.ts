import mongoose, { Schema, Document } from "mongoose";
import { MongooseID } from "../../../types";

export interface IConversation extends Document {
	//A COMPLETER
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>({
	participants: [{
        type: Schema.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: Schema.ObjectId,
        ref: "Message"
    }],
    title: {
        type: String,
        required: true
    },
    lastUpdate: {
        type: Date,
        required: true
    }
});

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;