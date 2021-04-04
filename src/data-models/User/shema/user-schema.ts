import DataTypes from 'sequelize';
import { sequelize } from '../../../data-access';
import { usersModel } from '../../../constants';
import { IUserInstance } from '../interfaces';

export const userSchema = sequelize.define<IUserInstance>(
  usersModel,
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },

    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },

    age: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 4,
        max: 130,
      },
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);
