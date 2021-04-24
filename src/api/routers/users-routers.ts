import express, { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  getUserWithGroup,
  updateUser,
} from '..';
import { userValidation } from '../../data-models';

const routerUsers: Router = express.Router();
const { addUserValidation } = userValidation;

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.get('/:userId/with-group', getUserWithGroup);
routerUsers.post('/', addUserValidation, createUser);
routerUsers.put('/:userId', addUserValidation, updateUser);
routerUsers.delete('/:userId', deleteUser);

export default routerUsers;
