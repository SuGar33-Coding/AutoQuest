import * as mongoose from "mongoose";

export interface UserType {
    userName: string;
    // password: string;
}

interface IUser extends mongoose.Document, UserType {}

export const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    // password: { type: String, required: true }
});

export const User = mongoose.model<IUser>("User", UserSchema);
