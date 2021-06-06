import { Request, Response, NextFunction } from 'express';
import { groupSchemaJoi, addUsersToGroupSchemaJoi } from '..';
import { statusCode } from '../../constants';

export const groupValidation = {
  addGroupValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const value = await groupSchemaJoi.validate(req.body);

    if (value.error) {
      res.status(statusCode.BAD_REQUEST).json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  addUsersToGroupValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const value = await addUsersToGroupSchemaJoi.validate(req.body);

    if (value.error) {
      res.status(statusCode.BAD_REQUEST).json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
