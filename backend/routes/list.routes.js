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
    },
    {
        url: '/:id',
        method: 'get',
        handler: list.getListById,
    },
];

export default listRoutes;