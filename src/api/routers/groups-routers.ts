import express, { Router } from 'express';
import { createGroup, getGroupById, getGroups, updateGroup } from '..';

const routerGroups: Router = express.Router();

routerGroups.get('/', getGroups);
routerGroups.get('/:groupId', getGroupById);
routerGroups.post('/', createGroup);
routerGroups.put('/:groupId', updateGroup);

export default routerGroups;
