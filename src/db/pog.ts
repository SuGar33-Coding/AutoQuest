import { Poggers, PoggerType } from "../models/Poggers";

export async function create(data: PoggerType) {
    try {
        return await Poggers.create(data);
    } catch (error) {
        return error;
    }
}
