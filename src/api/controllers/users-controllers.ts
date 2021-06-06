import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UsersDbService } from '../../services';
import { IUser } from '../../types';
import {
  errorMessage,
  notFoundMessage,
  specifiedLoginMessage,
  statusCode,
  updateUserMessage,
  userIdErrorMessage,
} from '../../constants';

const usersDbService = new UsersDbService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { loginSubstring, limit } = req.query;

    if (loginSubstring) {
      if (limit) {
        const filteredUsers = await usersDbService.getAutoSuggestUser(
          String(loginSubstring),
          +limit,
        );

        return res.status(statusCode.OK).json(filteredUsers);
      }

      const filteredUsers = await usersDbService.getAutoSuggestUser(
        String(loginSubstring),
      );

      return res.status(statusCode.OK).json(filteredUsers);
    }

    const users = await usersDbService.getAllUsers();

    return res.status(statusCode.OK).json(users);
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: errorMessage,
      error: err.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { withGroups } = req.query;

    const findUser = withGroups
      ? await usersDbService.getUsersWithGroup(userId)
      : await usersDbService.getUserById(userId);

    if (findUser) {
      return res.status(statusCode.OK).json(findUser);
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: IUser | undefined = req.body;

    if (user) {
      const checkLogin = await usersDbService.checkLoginExist(user.login);

      if (checkLogin) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: specifiedLoginMessage,
        });
      }

      const newUser = await usersDbService.createUser({
        id: uuid(),
        ...user,
      });

      return res.status(statusCode.OK).json(newUser);
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { id } = req.body;

    const findUser = await usersDbService.getUserById(userId);

    if (findUser) {
      if (id && id !== userId) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: userIdErrorMessage,
        });
      }

      await usersDbService.updateUser(findUser, req.body);

      return res.status(statusCode.OK).json({
        message: updateUserMessage(userId),
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const findUser = await usersDbService.getUserById(userId);

    if (userId && findUser) {
      await usersDbService.deleteUserById(userId);

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
