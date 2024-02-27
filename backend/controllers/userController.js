import userServices from "../services/user.services.js";
import { JwtUtils } from "../utils/jwtUtils.js";

const jwt = new JwtUtils();
const userService = new userServices();

export default class userController {
    async showMe(request, reply) {
        const { token } = request.headers;
        if(!token) return reply.code(403).send({ message: "Token not found" });
        const decodedToken = jwt.verifyToken(token, process.env.JWT_SECRET);
        return reply.code(200).send({decodedToken});
    }

    async findUserByEmail(request, reply) {
        try {
            const { email } = request.params;
            if (!email) return reply.code(400).send('Must include a valid email on the request');
            const user = await userService.findUserByEmail(email);
            return reply.code(200).send({name: user.name, email: user.email});
        } catch (error) {
            console.log("Error while finding user: " + error);
        }
    }
}