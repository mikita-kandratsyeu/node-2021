import { Model } from 'sequelize';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface IUserInstance extends Model, IUser {}
