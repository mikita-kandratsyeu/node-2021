import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { loginIntoSystem, refreshToken } from '..';
import { authValidation } from '../../data-models';
import { checkTokenRefresh } from '../../middlewares';

const routerAuth: Router = express.Router();
const { addAuthValidation } = authValidation;

routerAuth.post('/login', addAuthValidation, asyncHandler(loginIntoSystem));
routerAuth.post(
  '/refresh-token',
  checkTokenRefresh,
  asyncHandler(refreshToken),
);

export default routerAuth;
