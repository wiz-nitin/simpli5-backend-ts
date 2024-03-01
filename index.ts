import 'dotenv/config';
import express from 'express';
import { MongoClient } from './src/clients/mongo';
import routers from './src/routers';
import errorHandler from './src/middleware/errorHandler';
import cors from './src/middleware/cors';
import identify from './src/middleware/identify';



const port = process.env.PORT || 3000;

(async () => {
  const app = express();
  await MongoClient.init();
  
  app.use(cors());
  app.use(identify);
  app.use(express.urlencoded({ extended: true }) as any); // temp workaround for broken types with express typings
  app.use(express.json({ limit: `${100 * 1024 * 1024}mb` }) as any); // temp workaround for broken types with express typings { limit: `${100 * 1024 * 1024}mb` }

  app.listen(port, () => {
    console.log('\n --------------------------\n', `| Listening on port ${port} |`, '\n --------------------------');
    console.log(
      ' --------------------------\n',
      `|   Process id ${process.pid}     |`,
      '\n --------------------------\n',
    );
  });
  app.use(errorHandler);
  routers(app);
})();
