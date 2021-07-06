import express from 'express';
import UserController from '../controller/UserController';

export default class UserRouter {
    static router() {
        const router = express.Router();
        router.get('/profile', UserController.view);
        return router;
    }
}