import express, { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getAutoSuggestUser, getUserById, updateUser } from '../controllers';

const routerUsers: Router = express.Router();

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.get('/:substring/:limit', getAutoSuggestUser);
routerUsers.post('/', createUser);
routerUsers.patch('/:userId', updateUser);
routerUsers.delete('/:userId', deleteUser);

export default routerUsers;
