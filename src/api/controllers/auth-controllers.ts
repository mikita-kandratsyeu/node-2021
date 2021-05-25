import { Request, Response } from 'express';
import { TokenService, UsersDbService } from '../../services';
import { IUserInstance } from '../../types';
import {
  errorMessage,
  forbiddenError,
  incorrectPasswordOrLogin,
} from '../../constants';

const tokenService = new TokenService();
const usersDbService = new UsersDbService();

const { generateAccessToken, generateRefreshToken } = tokenService;

const generateBody = (user: IUserInstance) => ({
  'access-token': generateAccessToken({ id: user.id, login: user.login }),
  'refresh-token': generateRefreshToken({ id: user.id, login: user.login }),
});

export const loginIntoSystem = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await usersDbService.findUserByCredential(login, password);

    if (user) {
      return res.status(200).json(generateBody(user));
    }
    return res.status(403).json({
      message: forbiddenError,
      error: incorrectPasswordOrLogin,
    });
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
      error: err.message,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const user = res.locals.payload;

    return res.status(200).json(generateBody(user));
  } catch (err) {
    return res.status(500).json({
      message: errorMessage,
      error: err.message,
    });
  }
};
