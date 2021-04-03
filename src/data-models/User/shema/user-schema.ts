import DataTypes from 'sequelize';
import { sequelize } from '../../../data-access';

export const userSchema = sequelize.define(
  'Users',
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
  },
);
