import { JwtUtils } from "../utils/jwtUtils.js";
import listServices from "../services/list.services.js";
const listService = new listServices();
const jwt = new JwtUtils();

export default class listsController {
    async createNewList(request, reply) {
        try {
            const { name  } = request.body;
            const decodedToken = jwt.verifyToken(request.headers.token, process.env.JWT_SECRET);
    
            if (name.length === 0) name = 'New list';
    
            const newList = await listService.newList(name, decodedToken.id);
    
            return reply.code(201).send({message: "new list created successfully", newList});
        } catch (error) {
            console.log("Error while creating a new list: " + error);
        }
    }
    
    async removeList(request, reply){
        try {
            const id = request.params.id;
    
            const { token } = request.headers;
            if(!token) return reply.code(403).send({message: "Token not found"});
            const decodedToken = jwt.verifyToken(token, process.env.JWT_SECRET);
    
            const removeList = await listService.removeList(id, decodedToken.id);
            return removeList !== 'Unauthorized' 
                ? reply.code(201).send({message: "List removed successfully"})
                : reply.code(401).send({message: "You don't have permissions to remove a list of another user!"});
        } catch (error) {
            console.log("Error while trying to remove a list: " + error);
        }
    }
}
