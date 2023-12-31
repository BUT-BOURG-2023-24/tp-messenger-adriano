import mongoose, { Schema, Document } from "mongoose";
import { MongooseID } from "../../../types";

export interface IUser extends Document {
	//A COMPLETER
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicId: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
