import { Request, Response, NextFunction } from 'express';
import { userSchemaJoi } from '..';
import { statusCode } from '../../constants';

export const userValidation = {
  addUserValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const value = await userSchemaJoi.validate(req.body);

    if (value.error) {
      res.status(statusCode.BAD_REQUEST).json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
