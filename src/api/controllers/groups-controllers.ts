import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { GroupsDbService } from '../../services';
import {
  errorMessage,
  groupIdErrorMessage,
  notFoundMessage,
  specifiedNameMessage,
  updateGroupMessage,
  addUsersToGroupMessage,
  statusCode,
} from '../../constants';
import { IGroup } from '../../types';

const groupsDbService = new GroupsDbService();

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupsDbService.getAllGroups();

    if (groups) {
      return res.status(statusCode.OK).json(groups);
    }

    return res.status(statusCode.NOT_FOUND).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: errorMessage,
      error: err.message,
    });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const findGroup = await groupsDbService.getGroupById(groupId);

    if (findGroup) {
      return res.status(statusCode.OK).json(findGroup);
    }

    return res.status(statusCode.NOT_FOUND).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: errorMessage,
      error: err.message,
    });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const group: IGroup | undefined = req.body;

    if (group) {
      const checkName = await groupsDbService.checkNameExist(group.name);

      if (checkName) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: specifiedNameMessage,
        });
      }

      const newGroup = await groupsDbService.createGroup({
        id: uuid(),
        ...group,
      });

      return res.status(statusCode.OK).json(newGroup);
    }

    return res.status(statusCode.NOT_FOUND).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: errorMessage,
      error: err.message,
    });
  }
};

export const addUsersToGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { userIds } = req.body;

    if (groupId && userIds) {
      await groupsDbService.addUsersToGroup(groupId, userIds);

      return res.status(statusCode.OK).json({
        message: addUsersToGroupMessage(groupId, userIds),
      });
    }

    return res.status(statusCode.NOT_FOUND).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: errorMessage,
      error: err.message,
    });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { id } = req.body;

    const findGroup = await groupsDbService.getGroupById(groupId);

    if (findGroup) {
      if (id && id !== groupId) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: groupIdErrorMessage,
        });
      }

      await groupsDbService.updateGroup(findGroup, req.body);

      const updatedGroup = await groupsDbService.getGroupById(groupId);

      return res.status(statusCode.OK).json({
        message: updateGroupMessage(groupId),
        updatedGroup,
      });
    }

    return res.status(statusCode.NOT_FOUND).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: errorMessage,
      error: err.message,
    });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const findGroup = await groupsDbService.getGroupById(groupId);

    if (groupId && findGroup) {
      await groupsDbService.deleteGroup(findGroup);

      return res.status(statusCode.NO_CONTENT).send();
    }

    return res.status(statusCode.NOT_FOUND).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: errorMessage,
      error: err.message,
    });
  }
};
