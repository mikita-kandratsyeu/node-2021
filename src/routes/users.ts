import express, { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getAutoSuggestUser, getUserById, updateUser } from '../controllers';
import { validation } from '../data-models/User/validation';

const routerUsers: Router = express.Router();
const { addUserValidation } = validation;

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.get('/:substring/:limit', getAutoSuggestUser);
routerUsers.post('/', addUserValidation, createUser);
routerUsers.patch('/:userId', addUserValidation, updateUser);
routerUsers.delete('/:userId', deleteUser);

export default routerUsers;
