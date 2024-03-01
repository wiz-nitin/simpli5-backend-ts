import { Express } from 'express';
import notFound from './404';
import user from './user';
import support from './supportTicket';

const routers = (app: Express) => {
    user(app);
    support(app);
    // notFound is a catch all and should be last
    notFound(app)
    return app;
};

export default routers;