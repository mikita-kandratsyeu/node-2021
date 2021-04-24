import DataTypes from 'sequelize';
import { sequelize } from '../data-access';
import { IGroupInstance } from '../types';
import { groupsModel } from '../constants';

export const groupSchema = sequelize.define<IGroupInstance>(
  groupsModel,
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);
