import { user } from "../models/user.model.js";
import userServices from "./user.services.js";
import { validateUser } from "../utils/user-validation.js";
import * as bcrypt from "bcrypt";
const userService = new userServices();

export default class authServices {
    async verifyPassword(password, hashedPassword) {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
      }

    async register(body) {
        if ((await userService.findUserByEmail(body.email))) {
            return "repeated";
        }
        if (!validateUser(body)) return "invalid body";

        const newUser = await user.create(body);
        return newUser;
    }
}