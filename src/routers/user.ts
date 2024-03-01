import { Express, Router } from 'express';
import * as UserController from '../controller/user';
const router = Router();

const userRoutes = async (app: Express) => {
    router.post('/register', UserController.register);
}

export default (app: Express) => {
    userRoutes(app);
    app.use('/user', router);
};
