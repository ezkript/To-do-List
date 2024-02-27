import userController from "../controllers/userController.js";

const user = new userController();
const userRoutes = [
    {
        url: '/:email',
        method: 'get',
        handler: user.findUserByEmail,
    },
    {
        url: '/me',
        method: 'get',
        handler: user.showMe,
    }
];

export default userRoutes;