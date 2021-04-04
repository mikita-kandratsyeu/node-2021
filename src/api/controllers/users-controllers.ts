import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { UsersDbService } from '../../services';
import { IUser } from '../../data-models';
import {
  errorMessage,
  notFoundMessage,
  specifiedLoginMessage,
  updateUserMessage,
  userIdErrorMessage,
} from '../../constants';

const usersDbService = new UsersDbService();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { loginSubstring } = req.query;
    const { limit } = req.query;

    console.log(loginSubstring, limit);

    if (loginSubstring) {
      if (limit) {
        const filteredUsers: IUser[] = await usersDbService.getAutoSuggestUser(
          String(loginSubstring),
          +limit,
        );

        return res.status(200).json(filteredUsers);
      }

      const filteredUsers: IUser[] = await usersDbService.getAutoSuggestUser(
        String(loginSubstring),
      );

      return res.status(200).json(filteredUsers);
    }

    const users = await usersDbService.getAllUsers();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
    });
  } finally {
    next();
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const findUser: IUser | null = await usersDbService.getUserById(userId);

    if (findUser) {
      return res.status(200).json(findUser);
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
    });
  } finally {
    next();
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: IUser | undefined = req.body;

    if (user) {
      const checkLogin = await usersDbService.checkLoginExist(user.login);

      if (checkLogin) {
        return res.status(400).json({
          message: specifiedLoginMessage,
        });
      }

      const newUser: IUser = await usersDbService.createUser({
        id: uuid(),
        ...user,
      });

      return res.status(200).json(newUser);
    }

    return res.status(404).json({
      message: errorMessage,
    });
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
    });
  } finally {
    next();
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const { id } = req.body;

    const findUser: IUser | null = await usersDbService.getUserById(id);

    if (findUser) {
      if (id && id !== userId) {
        return res.status(400).json({
          message: userIdErrorMessage,
        });
      }

      await usersDbService.updateUser(findUser, req.body);

      return res.status(200).json({
        message: updateUserMessage(userId),
      });
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
    });
  } finally {
    next();
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const findUser: IUser | null = await usersDbService.getUserById(userId);

    if (userId && findUser) {
      await usersDbService.deleteUserById(userId);

      return res.status(204).send();
    }

    return res.status(404).json({
      message: notFoundMessage,
    });
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
    });
  } finally {
    next();
  }
};