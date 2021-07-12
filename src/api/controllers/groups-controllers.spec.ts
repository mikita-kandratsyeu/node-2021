import express, { Application } from 'express';
import { Response } from 'supertest';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { sequelize } from '../../data-access';
import { routerGroups } from '..';
import { userSchema, groupSchema, userGroupSchema } from '../../data-models';
import {
  addUsersToGroupMessage,
  statusCode,
  updateGroupMessage,
} from '../../constants';

const request = require('supertest');

const port: number | string = process.env.PORT_TESTING || 5000;
const appMock: Application = express();

let server: http.Server;

appMock.use(bodyParser.json());
appMock.use('/api/groups', routerGroups);

const groupOneMock = {
  name: 'mockGroup1',
  permissions: ['READ', 'WRITE'],
};

const groupSecondMock = {
  name: 'mockGroup2',
  permissions: ['READ', 'WRITE', 'DELETE'],
};

const addUsersToGroupMock = {
  userIds: ['10', '4', '5'],
};

let groupIdMock: string;

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

describe('api/groups', () => {
  it('GET api/groups', async () => {
    await request(appMock)
      .get('/api/groups')
      .expect(statusCode.OK)
      .expect((res: Response) => {
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('POST api/groups', async () => {
    await request(appMock)
      .post('/api/groups')
      .send(groupOneMock)
      .expect(statusCode.OK)
      .expect((res: Response) => {
        expect(res.body.id).toBeTruthy();
        groupIdMock = res.body.id;
      });
  });

  it('GET api/groups/:groupId', async () => {
    await request(appMock)
      .get(`/api/groups/${groupIdMock}`)
      .expect(statusCode.OK)
      .expect((res: Response) => {
        expect(res.body.name).toBe(groupOneMock.name);
        expect(res.body.permissions).toStrictEqual(groupOneMock.permissions);
      });
  });

  it('UPDATE api/groups/:groupId', async () => {
    await request(appMock)
      .put(`/api/groups/${groupIdMock}`)
      .send({ id: groupIdMock, ...groupSecondMock })
      .expect((res: Response) => {
        expect(res.body.message).toBe(updateGroupMessage(groupIdMock));
        expect(res.body.updatedGroup).toStrictEqual({
          id: groupIdMock,
          ...groupSecondMock,
        });
      });
  });

  it('POST api/groups/:groupId/add-users', async () => {
    await request(appMock)
      .post(`/api/groups/${groupIdMock}/add-users`)
      .send(addUsersToGroupMock)
      .expect((res: Response) => {
        expect(res.body.message).toBe(
          addUsersToGroupMessage(groupIdMock, addUsersToGroupMock.userIds),
        );
      });
  });

  it('DELETE api/groups/:groupId', async () => {
    await request(appMock)
      .delete(`/api/groups/${groupIdMock}`)
      .expect(statusCode.NO_CONTENT);
  });
});
