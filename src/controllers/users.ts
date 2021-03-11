import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { usersMock } from '../mock';
import { sortByLogin } from '../services';
import { IUser } from '../mock/interfaces';

const users: IUser[] = [...usersMock];

export const getAllUsers = (req: Request, res: Response): void => {
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;

  const findUser: IUser | undefined = users.find((user: IUser) => user.id === userId);

  if (findUser) {
    res.status(200).json(findUser);
  } else {
    res.status(500).json({
      message: 'User does not exist!',
    });

    next(new Error('User does not exist!'));
  }
};

export const getAutoSuggestUser = (req: Request, res: Response, next: NextFunction): void => {
  const { substring, limit } = req.params;

  const filteredUsers: IUser[] | undefined = sortByLogin([...users]).filter((user: IUser) =>
    user.login.includes(substring),
  );

  if (filteredUsers) {
    res.status(200).json(filteredUsers.slice(0, +limit));
  } else {
    res.status(500).json({
      message: 'User does not exist!',
    });

    next(new Error('User does not exist!'));
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction): void => {
  const user: IUser | undefined = req.body;

  if (user) {
    users.push({ ...user, id: uuid() });

    res.status(200).json({
      message: `User with the login: ${user.login} was added into the DB!`,
    });
  } else {
    res.status(500).json({
      message: 'User does not exist!',
    });

    next(new Error('User does not exist!'));
  }
};

export const updateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  const { login, age, isDeleted } = req.body;

  const findUser: IUser | undefined = users.find((user: IUser) => user.id === userId);

  if (findUser) {
    if (login) findUser.login = login;

    if (age) findUser.age = age;

    findUser.isDeleted = !!isDeleted;

    res.status(200).json({
      message: `User with the id: ${userId} has been updated!`,
    });
  } else {
    res.status(500).json({
      message: 'User does not exist!',
    });

    next(new Error('User does not exist!'));
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;

  if (userId) {
    users.find(user => user.id === userId).isDeleted = true;

    res.status(200).send({
      message: `User with the id: ${userId} has been marked as deleted!`,
    });
  } else {
    res.status(500).json({
      message: 'User does not exist!',
    });

    next(new Error('User does not exist!'));
  }
};
