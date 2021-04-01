import express, { Router } from 'express';
import { createUser, deleteUser, getUsers, getUserById, updateUser } from '../controllers';
import { validation } from '../data-models/User/validation';

const routerUsers: Router = express.Router();
const { addUserValidation } = validation;

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.post('/', addUserValidation, createUser);
routerUsers.put('/:userId', addUserValidation, updateUser);
routerUsers.delete('/:userId', deleteUser);

export default routerUsers;
