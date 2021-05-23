import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createUser, deleteUser, getUsers, getUserById, updateUser } from '..';
import { userValidation } from '../../data-models';

const routerUsers: Router = express.Router();
const { addUserValidation } = userValidation;

routerUsers.get('/', asyncHandler(getUsers));
routerUsers.get('/:userId', asyncHandler(getUserById));
routerUsers.post('/', addUserValidation, asyncHandler(createUser));
routerUsers.put('/:userId', addUserValidation, asyncHandler(updateUser));
routerUsers.delete('/:userId', asyncHandler(deleteUser));

export default routerUsers;
