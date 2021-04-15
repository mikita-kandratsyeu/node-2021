import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { routerUsers } from './api';
import { sequelize } from './data-access';
import { userSchema } from './data-models';
import { notFoundMessage, startServerMessage } from './constants';

const app: Application = express();
const port: number | string = process.env.PORT || 5000;

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cors());

app.use('/api/users', routerUsers);

app.use((req: Request, res: Response): void => {
  res.status(404).json({
    message: notFoundMessage,
  });
});

const startServer = async () => {
  await sequelize.authenticate();
  await userSchema.sync();
};

startServer()
  .then(() => {
    app.listen(port, () => {
      console.info(startServerMessage(port));
    });
  })
  .catch(err => console.info(err));
