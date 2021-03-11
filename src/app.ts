import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import { routerUsers } from './routes';

const app: Application = express();
const port: number | string = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/users', routerUsers);

app.get('/', (req: Request, res: Response): void => {
  res.send('Application working correctly with a TypeScript!');
});

app.listen(port, (): void => {
  console.info(`Server running on port: http://localhost:${port}`);
});
