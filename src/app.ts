import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import { routerUsers } from './routes';
import { sequelize } from './data-access';
import { userSchema } from './data-models/User';

const app: Application = express();
const port: number | string = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/users', routerUsers);

app.use((req: Request, res: Response): void => {
  res.status(404).json({
    message: 'Sorry cant find that!',
  });
});

sequelize
  .authenticate()
  .then(() => {
    userSchema.sync().then();
    app.listen(port, () => {
      console.info(`Server running on port: http://localhost:${port}`);
    });
  })
  .catch(err => console.info(err));
