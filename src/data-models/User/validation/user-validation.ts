import { Request, Response, NextFunction } from 'express';
import { userSchemaJoi } from '.';

export const userValidation = {
  addUserValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const value = await userSchemaJoi.validate(req.body);

    if (value.error) {
      res.status(400).json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
