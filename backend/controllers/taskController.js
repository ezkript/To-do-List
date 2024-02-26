import tasksServices from "../services/tasks.services.js";
import { JwtUtils } from "../utils/jwtUtils.js";

const jwt = new JwtUtils();
const tasksService = new tasksServices();

export default class taskController {
    async toggleTask(request, reply) {
        const { id } = request.params;

        const { token } = request.headers;
        if(!token) return reply.code(403).send({ message: "Token not found" });
        const decodedToken = jwt.verifyToken(token, process.env.JWT_SECRET);

        const taskUpdated = await tasksService.toggleTask(id, decodedToken.id);

        return taskUpdated !== 'Unauthorized'
            ? reply.code(200).send({ message: "The task has been toggled", task: taskUpdated })
            : reply.code(401).send({ message: "You don't have permissions to update this task!" });
    }

    async createNewTask(request, reply) {
        try {
            const { title, description } = request.body;
            const { listId } = request.params;

            const { token } = request.headers;
            if(!token) return reply.code(403).send({message: "Token not found"});
            const decodedToken = jwt.verifyToken(token, process.env.JWT_SECRET);
    
            if (title.length === 0) title = 'New task';
    
            const newTask = await tasksService.newTask({ title, description, listId }, decodedToken.id);

            return newTask === 'List not found'
                ? reply.code(404).send({message: "List not found"})
                : newTask === 'Unauthorized'
                    ? reply.code(401).send({message: "You don't have permissions to add tasks to this list"})
                    : reply.code(201).send({message: "new task created successfully", newTask});
                
        } catch (error) {
            console.log("Error while creating a new task: " + error);
        }
    }

    async deleteTask(request, reply){
        try {
            const { id, listId }= request.params;
    
            const { token } = request.headers;
            if(!token) return reply.code(403).send({message: "Token not found"});
            const decodedToken = jwt.verifyToken(token, process.env.JWT_SECRET);
    
            const removeTask = await tasksService.removeTask(id, listId, decodedToken.id);
            return removeTask !== 'Unauthorized' 
                ? reply.code(201).send({message: removeTask})
                : reply.code(401).send({message: "You don't have permissions to remove a task of this list!"});
        } catch (error) {
            console.log("Error while trying to remove a task: " + error);
        }
    }
}