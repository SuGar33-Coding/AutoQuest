// import { getModelForClass, prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

export interface PoggerType {
    pogVal: number;
    pogName: string;
    pogSecret: string | undefined;
}

interface IPoggers extends mongoose.Document, PoggerType {}

export const PoggersSchema = new mongoose.Schema({
    pogVal: { type: Number, required: true },
    pogName: { type: String, required: true },
    pogSecret: { type: String },
});

export const Poggers = mongoose.model<IPoggers>("Poggers", PoggersSchema);
