import listController from "../controllers/listsController.js";

const list = new listController();

const listRoutes = [
    {
        url: '/',
        method: 'post',
        handler: list.createNewList,
    },
    {
        url: '/:id',
        method: 'delete',
        handler: list.removeList,
    },
    {
        url: '/all',
        method: 'get',
        handler: list.getLists,
    }
];

export default listRoutes;