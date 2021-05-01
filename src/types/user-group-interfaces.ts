import { Model } from 'sequelize';

export interface IUserGroup extends Model {
  userId: string;
  groupId: string;
}

export interface IUserGroupInstance extends Model, IUserGroup {}
