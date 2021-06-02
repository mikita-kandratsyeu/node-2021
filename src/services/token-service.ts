import jwt from 'jsonwebtoken';
import { IUserToken } from '../types';

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
}
