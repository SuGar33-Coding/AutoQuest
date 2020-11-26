import mongoose from "mongoose";
import { Poggers, PoggerType } from "../models/Poggers";

export async function createPog(data: PoggerType) {
    try {
        return await Poggers.create(data);
    } catch (error) {
        return error;
    }
}
