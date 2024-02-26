import { user } from "../models/user.model.js";

export default class userServices {
    async findUserByEmail(email) {
        return await user.findOne({ email });
    }
}