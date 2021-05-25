import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { loginIntoSystem, refreshToken } from '..';
import { TokenService } from '../../services';
import { authValidation } from '../../data-models';

const routerAuth: Router = express.Router();
const { addAuthValidation } = authValidation;

const tokenService = new TokenService();

routerAuth.post('/login', addAuthValidation, asyncHandler(loginIntoSystem));
routerAuth.post(
  '/refresh-token',
  tokenService.checkTokenAccess,
  asyncHandler(refreshToken),
);

export default routerAuth;
