import express, { Application } from 'express';
import { Response } from 'supertest';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { sequelize } from '../../data-access';
import { routerUsers } from '..';
import { groupSchema, userGroupSchema, userSchema } from '../../data-models';
import { statusCode, updateUserMessage } from '../../constants';

const request = require('supertest');

const port: number | string = process.env.PORT_TESTING || 5000;
const appMock: Application = express();

let server: http.Server;

appMock.use(bodyParser.json());
appMock.use('/api/users', routerUsers);

const userOneMock = {
  login: 'superTest',
  password: 'Qwerty123',
  age: 23,
  isDeleted: false,
};

const userSecondMock = {
  login: 'superTest1',
  password: 'Qwerty1233232',
  age: 50,
  isDeleted: false,
};

let userIdMock: string;

beforeAll(async () => {
  await sequelize
    .authenticate()
    .then(async () => {
      await userSchema.sync();
      await groupSchema.sync();
      await userGroupSchema.sync();

      userSchema.belongsToMany(groupSchema, {
        through: userGroupSchema,
        foreignKey: 'userId',
      });

      groupSchema.belongsToMany(userSchema, {
        through: userGroupSchema,
        foreignKey: 'groupId',
      });

      server = await appMock.listen(port);
    })
    .catch(err => console.error(err));
});

afterAll(async () => {
  await server.close();
});

describe('api/users', () => {
  it('GET api/users', async () => {
    await request(appMock)
      .get('/api/users')
      .expect(statusCode.OK)
      .expect((res: Response) => {
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('POST api/users', async () => {
    await request(appMock)
      .post('/api/users')
      .send(userOneMock)
      .expect(statusCode.OK)
      .expect((res: Response) => {
        expect(res.body.id).toBeTruthy();
        userIdMock = res.body.id;
      });
  });

  it('GET api/users/:userId', async () => {
    await request(appMock)
      .get(`/api/users/${userIdMock}`)
      .expect(statusCode.OK)
      .expect((res: Response) => {
        expect(res.body.login).toBe(userOneMock.login);
        expect(res.body.password).toBe(userOneMock.password);
        expect(res.body.age).toBe(userOneMock.age);
      });
  });

  it('UPDATE api/users/:userId', async () => {
    await request(appMock)
      .put(`/api/users/${userIdMock}`)
      .send({ id: userIdMock, ...userSecondMock })
      .expect(statusCode.OK)
      .expect((res: Response) => {
        expect(res.body.message).toBe(updateUserMessage(userIdMock));
      });
  });

  it('DELETE api/users/:userId', async () => {
    await request(appMock).delete(`/api/users/${userIdMock}`).expect(204);

    // Hard delete Mock User
    await userSchema.destroy({
      where: { id: userIdMock },
    });
  });
});
