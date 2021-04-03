import { Request, Response, NextFunction } from 'express';
import { user } from '.';

export const validation = {
  addUserValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const value = await user.validate(req.body);

    if (value.error) {
      res.status(400).json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
