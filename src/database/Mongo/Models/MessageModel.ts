import mongoose, { Schema, Document } from "mongoose";
import { MongooseID } from "../../../types";

export interface IMessage extends Document {
	//A COMPLETER
}

const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
	conversationId: {
        type: Schema.ObjectId,
        ref: "Conversation",
        required: true,
        unique: true
    },
    from: {
        type: Schema.ObjectId,
        ref: "User",
        required: true  
    },
    content: {
        type: String,
        required: true
    }
    ,
    postedAt: {
        type: Date,
        required: true
    },
    replyTo: {
        type: Schema.ObjectId,
        ref:"Message",
        required: false,
        
    },
    edited: {
        type: Boolean,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    }
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export { MessageModel, MessageSchema };
