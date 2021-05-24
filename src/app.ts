import express, { Request, Response, Application, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routerUsers, routerGroups } from './api';
import { sequelize } from './data-access';
import { groupSchema, userSchema, userGroupSchema } from './data-models';
import { notFoundMessage, startServerMessage } from './constants';
import { Logger, morganMiddleware } from '../config';

const app: Application = express();
const port: number | string = process.env.PORT || 5000;

app.use(cors());

app.use(morganMiddleware);

app.use(bodyParser.json());

app.use('/api/users', routerUsers);

app.use('/api/groups', routerGroups);

app.use((req: Request, res: Response): void => {
  res.status(404).json({
    message: notFoundMessage,
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(
    `Method: ${req.method} / Arguments: ${JSON.stringify(req.query)} / Error: ${
      err.message
    }`,
  );

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

process
  .on('unhandledRejection', (reason, p) => {
    Logger.error(`${reason} Unhandled Rejection at Promise ${p}`);
  })
  .on('uncaughtException', err => {
    Logger.error(`${err} Uncaught Exception thrown`);
    process.exit(1);
  });

const startServer = async () => {
  await sequelize.authenticate();
  await userSchema.sync();
  await groupSchema.sync();
  await userGroupSchema.sync();
};

startServer()
  .then(() => {
    userSchema.belongsToMany(groupSchema, {
      through: userGroupSchema,
      foreignKey: 'userId',
    });

    groupSchema.belongsToMany(userSchema, {
      through: userGroupSchema,
      foreignKey: 'groupId',
    });

    app.listen(port, () => {
      Logger.debug(startServerMessage(port, process.env.HOST_NAME));
    });
  })
  .catch(err => Logger.error(err));
