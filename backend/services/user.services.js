import { user } from "../models/user.model.js";
import { list } from "../models/lists.model.js";

export default class userServices {
    async findUserByEmail(email) {
        return await user.findOne({ email });
    }
    
    async findUserById(id) {
        return await user.findById(id);
    }
    
    async deleteUserById(id) {
        return await user.findByIdAndDelete(id);
    }

    async updateUserById(id, data) {
        return await user.findByIdAndUpdate(id, data);
    }
}