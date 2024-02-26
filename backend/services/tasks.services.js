import { task } from "../models/tasks.model.js";
import listServices from "./list.services.js";
const listService = new listServices();

export default class tasksServices {
    async getTaskById(id) {
        return await task.findById(id);
    }
    
    async toggleTask(id, userId) {
        const getTask = await this.getTaskById(id);
        
        const list = await listService.getListById(getTask.listId);
        if (list.userId !== userId) return 'Unauthorized';

        const taskToggled = getTask.done 
            ? await task.findByIdAndUpdate(id, { done: false })
            : await task.findByIdAndUpdate(id, { done: true });

        return taskToggled;
    }

    async newTask(data, userId) {
        const list = await listService.getListById(data.listId);

        if (!list) return "List not found";
        if (list.userId !== userId) return "Unauthorized";
        
        const newTask = await task.create(data);

        const updatedTasks = [...list.tasks, newTask.id];
        try {
            await listService.updateList(data.listId, {
                tasks: updatedTasks,
            });
        } catch (error) {
            console.log(error);
        }

        return newTask; 
    }

    async removeTask(id, listId, userId) {
        const list = await listService.getListById(listId);
    
        if (list.userId !== userId) return 'Unauthorized';
    
        const updatedTasks = list.tasks.filter((taskId) => taskId !== id);

        try {
            await listService.updateList(listId, {
                tasks: updatedTasks,
            });
        } catch (error) {
            console.log(error);
        }
    
        await task.findByIdAndDelete(id);
    
        return `Task ${id} successfully removed from list ${list.name}`; 
    }
}