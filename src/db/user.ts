import { User, UserType } from "../models/User";

export async function create(data: UserType) {
    try {
        return await User.create(data);
    } catch (error) {
        return error;
    }
}
