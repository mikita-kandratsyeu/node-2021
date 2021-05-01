import DataTypes from 'sequelize';
import { sequelize } from '../data-access';
import { IUserGroupInstance } from '../types';
import { userSchema, groupSchema } from '.';
import { userGroupModel } from '../constants';

export const userGroupSchema = sequelize.define<IUserGroupInstance>(
  userGroupModel,
  {
    userId: {
      type: DataTypes.STRING,
      references: {
        model: userSchema,
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.STRING,
      references: {
        model: groupSchema,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);
