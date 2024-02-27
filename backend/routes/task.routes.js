import taskController from "../controllers/taskController.js";

const task = new taskController();

const taskRoutes = [
    {
        url: '/:listId',
        method: 'post',
        handler: task.createNewTask,
    },
    {
        url: '/:id/:listId',
        method: 'delete',
        handler: task.deleteTask,
    },
    {
        url: '/toggle/:id',
        method: 'patch',
        handler: task.toggleTask,
    },
    {
        url: '/all/:id',
        method: 'get',
        handler: task.getTasks,
    }
];

export default taskRoutes;