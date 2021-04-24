import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { GroupsDbService } from '../../services';
import {
  errorMessage,
  groupIdErrorMessage,
  notFoundMessage,
  specifiedNameMessage,
  updateGroupMessage,
} from '../../constants';
import { IGroup } from '../../types';

const groupsDbService = new GroupsDbService();

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupsDbService.getAllGroups();

    if (groups) {
      return res.status(200).json(groups);
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(500).json({
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
      return res.status(200).json(findGroup);
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(500).json({
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
        return res.status(400).json({
          message: specifiedNameMessage,
        });
      }

      const newGroup = await groupsDbService.createGroup({
        id: uuid(),
        ...group,
      });

      return res.status(200).json(newGroup);
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
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
        return res.status(400).json({
          message: groupIdErrorMessage,
        });
      }

      await groupsDbService.updateGroup(findGroup, req.body);

      return res.status(200).json({
        message: updateGroupMessage(groupId),
      });
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(500).json({
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

      return res.status(204).send();
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
      error: err.message,
    });
  }
};
