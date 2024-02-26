import authController from "../controllers/authController.js";

const auth = new authController();
const authRoutes = [
    {
        url: '/register',
        method: 'POST',
        handler: auth.register,
    },
    {
        url: '/login',
        method: 'POST',
        handler: auth.login,
    },
];

export default authRoutes;