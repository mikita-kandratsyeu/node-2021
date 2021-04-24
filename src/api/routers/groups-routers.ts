import express, { Router } from 'express';
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
} from '..';

const routerGroups: Router = express.Router();

routerGroups.get('/', getGroups);
routerGroups.get('/:groupId', getGroupById);
routerGroups.post('/', createGroup);
routerGroups.put('/:groupId', updateGroup);
routerGroups.delete('/:groupId', deleteGroup);

export default routerGroups;
