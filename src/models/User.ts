import * as mongoose from "mongoose";

export interface UserType {
    userName: string;
    level?: number;
    numActions?: number;
    // password: string;
}

interface IUser extends mongoose.Document, UserType {}

export const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    level: { type: Number },
    numActions: { type: Number },
    // password: { type: String, required: true }
});

export const User = mongoose.model<IUser>("User", UserSchema);
