import authServices from "../services/auth.services.js";
import * as bcrypt from "bcrypt";
import userServices from "../services/user.services.js";
import { JwtUtils } from "../utils/jwtUtils.js";
const jwt = new JwtUtils();
const userService = new userServices();
const authService = new authServices();

export default class authController {
    async register(request, reply) {
        const body = request.body;
        if (!body) {
            return reply.code(400).send('The request must include a body!');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);

        body.password = hashedPassword;
        const newUser = await authService.register(body);
        if (newUser === "repeated") return reply.code(400).send({message: "The email already exists"});
        if (newUser === "invalid body") return reply.code(400).send({message: "Check the data"});
        return reply.code(200).send(newUser);
    }

    async login(request, reply) {
        const { email, password } = request.body;
        const user = await userService.findUserByEmail(email);
        
        if (!user) return reply.code(404).send({message: 'user not found'});
        
        const pwdMatch = await authService.verifyPassword(password, user.password);
        
        if (!pwdMatch) return reply.code(403).send({message: "The password is not correct!"});
        
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
        }

        const token = jwt.generateToken(
            payload, 
            process.env.JWT_SECRET,
            process.env.JWT_EXPIRES_IN
        );

        return reply.code(200).send({message: "Welcome "+user.name+"!", token});
    }
}