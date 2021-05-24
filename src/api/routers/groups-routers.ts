import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
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

routerGroups.get('/', asyncHandler(getGroups));
routerGroups.get('/:groupId', asyncHandler(getGroupById));
routerGroups.post('/', addGroupValidation, asyncHandler(createGroup));
routerGroups.post(
  '/:groupId/add-users',
  addUsersToGroupValidation,
  addUsersToGroup,
);
routerGroups.put('/:groupId', addGroupValidation, asyncHandler(updateGroup));
routerGroups.delete('/:groupId', asyncHandler(deleteGroup));

export default routerGroups;
