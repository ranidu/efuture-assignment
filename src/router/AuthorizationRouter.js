import express from 'express';
import UserController from '../controller/UserController';
import AuthenticationController from '../controller/AuthenticationController';

export default class AuthenticationRouter {
    static router() {
        const router = express.Router();
        router.post('/register', UserController.create);
        router.post('/login', AuthenticationController.login);
        router.get('/logout', AuthenticationController.logout);
        return router;
    }
}