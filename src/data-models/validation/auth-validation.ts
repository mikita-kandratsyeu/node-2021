import { Request, Response, NextFunction } from 'express';
import { authSchemaJoi } from '..';
import { statusCode } from '../../constants';

export const authValidation = {
  addAuthValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const value = await authSchemaJoi.validate(req.body);

    if (value.error) {
      res.status(statusCode.BAD_REQUEST).json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
