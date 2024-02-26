import userServices from "../services/user.services.js";
const userService = new userServices();

export default class userController {
    async findUserByEmail(request, reply) {
        try {
            const { email } = request.params;
            if (!email) return reply.code(400).send('Must include a valid email on the request');
            const user =  userService.findUserByEmail(email);
            return reply.code(200).send(user);
        } catch (error) {
            console.log("Error while finding user: " + error);
        }
    }
}