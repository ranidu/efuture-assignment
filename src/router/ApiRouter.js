import express from 'express';
import AuthenticationRouter from './AuthorizationRouter';
import UserRouter from './UserRouter';
import Authenticator from '../middleware'

export default class ApiRouter {
    static router(){
        const router = express.Router();
        router.use('/auth', AuthenticationRouter.router());
        router.use('/users', Authenticator, UserRouter.router());
        return router;
    }
}