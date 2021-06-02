import { Request, Response } from 'express';
import { TokenService, UsersDbService } from '../../services';
import {
  errorMessage,
  forbiddenError,
  incorrectPasswordOrLogin,
} from '../../constants';
import { IUserToken } from '../../types';

const usersDbService = new UsersDbService();
const tokenService = new TokenService();

export const loginIntoSystem = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await usersDbService.login(login, password);

    if (user) {
      return res.status(200).json(user);
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

    if (user) {
      const payload: IUserToken = {
        id: user.id,
        login: user.login,
      };

      return res.status(200).json({
        'access-token': tokenService.generateAccessToken(payload),
        'refresh-token': tokenService.generateRefreshToken(payload),
      });
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
