import express, { Router } from 'express';
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
  addUsersToGroup,
} from '..';
import { groupValidation } from '../../data-models';

const routerGroups: Router = express.Router();
const { addGroupValidation, addUsersToGroupValidation } = groupValidation;

routerGroups.get('/', getGroups);
routerGroups.get('/:groupId', getGroupById);
routerGroups.post('/', addGroupValidation, createGroup);
routerGroups.post(
  '/:groupId/add-users',
  addUsersToGroupValidation,
  addUsersToGroup,
);
routerGroups.put('/:groupId', addGroupValidation, updateGroup);
routerGroups.delete('/:groupId', deleteGroup);

export default routerGroups;
