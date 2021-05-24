import { Sequelize } from 'sequelize';

const uri: string = process.env.DB_URI;

export const sequelize = new Sequelize(uri, {
  dialect: 'postgres',
});
