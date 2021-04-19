import { Sequelize } from 'sequelize';

const uri: string =
  'postgres://sgdzspzk:BmkNds5H3J9nDbt0nOCHUn6T2mC2fjVR@tai.db.elephantsql.com:5432/sgdzspzk';

export const sequelize = new Sequelize(uri, {
  dialect: 'postgres',
});
