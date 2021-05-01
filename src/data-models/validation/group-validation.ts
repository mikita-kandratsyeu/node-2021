import { Request, Response, NextFunction } from 'express';
import { groupSchemaJoi, addUsersToGroupSchemaJoi } from '..';

export const groupValidation = {
  addGroupValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const value = await groupSchemaJoi.validate(req.body);

    if (value.error) {
      res.status(400).json({
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
      res.status(400).json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
