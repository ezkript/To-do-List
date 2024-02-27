import { list } from "../models/lists.model.js";
import userServices from "./user.services.js";
const userService = new userServices();


export default class listServices {
    async getLists(userId) {
        return await list.find({ userId });
    }
    async getListById(id, userId) {
        const listFound = await list.findById(id);

        if(listFound.userId !== userId) return 'Unauthorized';

        return listFound;
    }

    async updateList(id, data){
        return await list.findByIdAndUpdate(id, data);
    }

    async newList(name, userId) {
        const newList = await list.create({ name, userId});
    
        const user = await userService.findUserById(userId);
        
        if (!user) return "user id not found";
    
        const updatedLists = [...user.lists, newList.id];
    
        try {
            await userService.updateUserById(userId, {
                lists: updatedLists,
            });
        } catch (error) {
            console.log(error);
        }
    
    
        return newList;
    }
    
    async removeList(id, userId){
        const user = await userService.findUserById(userId);
    
        if (!user.lists.includes(id)) return 'Unauthorized';
    
        const updatedLists = user.lists.filter((listId) => listId !== id);

        try {
            await userService.updateUserById(userId, {
                lists: updatedLists,
            });
        } catch (error) {
            console.log(error);
        }
    
        await list.findByIdAndDelete(id);
    
        return `List ${id} successfully removed`; 
    }
}
