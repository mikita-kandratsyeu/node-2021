import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { usersMock } from '../mock';
import { sortByLogin } from '../services';
import { IUser } from '../data-models/User/interfaces';

const users: IUser[] = [...usersMock];

export const getUsers = (req: Request, res: Response): void => {
  const { loginSubstring } = req.query;
  const { limit } = req.query;

  if (loginSubstring) {
    const filteredUsers: IUser[] | undefined = sortByLogin([...users]).filter(user =>
      user.login.toLowerCase().includes(String(loginSubstring).toLowerCase()),
    );

    if (limit) {
      res.status(200).json(filteredUsers.slice(0, +limit));
    } else {
      res.status(200).json(filteredUsers);
    }
  } else {
    res.status(200).json(users.filter(user => !user.isDeleted));
  }
};

export const getUserById = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;

  const findUser: IUser | undefined = users.find(user => user.id === userId);

  if (findUser) {
    res.status(200).json(findUser);
  } else {
    res.status(404).json({
      message: 'User does not exist!',
    });

    next();
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction): void => {
  const user: IUser | undefined = req.body;

  if (user) {
    if (users.map(item => item.login).includes(user.login)) {
      res.status(400).json({
        message: 'The login you specified is busy! Try again!',
      });
    } else {
      const newUser: IUser = { id: uuid(), ...user };

      users.push(newUser);

      res.status(200).json(newUser);
    }
  } else {
    res.status(404).json({
      message: 'Something went wrong!',
    });

    next();
  }
};

export const updateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  const { id, login, password, age, isDeleted } = req.body;

  const findUser: IUser | undefined = users.find(user => user.id === userId);

  if (findUser) {
    if (id && id !== userId) {
      res.status(400).json({
        message: "User's id cannot be changed!",
      });
    }

    if (login) findUser.login = login;

    if (age) findUser.age = age;

    if (password) findUser.password = password;

    findUser.isDeleted = !!isDeleted;

    res.status(200).json({
      message: `User with the id: ${userId} has been updated!`,
    });
  } else {
    res.status(404).json({
      message: 'User does not exist!',
    });

    next();
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;

  if (userId) {
    const user = users.find(item => item.id === userId);

    user.isDeleted = true;

    res.status(200).send(user);
  } else {
    res.status(404).json({
      message: 'User does not exist!',
    });

    next();
  }
};
