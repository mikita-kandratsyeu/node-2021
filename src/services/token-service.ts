import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUserToken } from '../types';
import { forbiddenError, unauthorizedError } from '../constants';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export class TokenService {
  generateAccessToken = (payload: IUserToken) =>
    jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: '60s',
    });

  generateRefreshToken = (payload: IUserToken) =>
    jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: '1h',
    });

  checkTokenAccess = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: any = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,
        (err: VerifyErrors | null, payload: any) => {
          if (err) {
            res.status(403).json({
              message: forbiddenError,
              error: err.message,
            });
          } else {
            res.locals.payload = payload;
            next();
          }
        },
      );
    } else {
      res.status(401).json({
        message: unauthorizedError,
      });
    }
  };
}
