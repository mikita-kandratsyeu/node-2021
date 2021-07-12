import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { forbiddenError, statusCode, unauthorizedError } from '../constants';

const checkTokenRefresh = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err: VerifyErrors | null, payload: any) => {
        if (err) {
          res.status(statusCode.FORBIDDEN).json({
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
    res.status(statusCode.UNAUTHORIZED).json({
      message: unauthorizedError,
    });
  }
};

export default checkTokenRefresh;
