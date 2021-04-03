import { sequelize } from '../data-access';
import { IUser, userSchema } from '../data-models/User';
import { usersMock } from '../mock';
import { usersModel } from '../constants';

const users: IUser[] = [...usersMock];

const usersDefinition = async () => {
  await sequelize.authenticate();
  await userSchema.sync({ force: true });
  await userSchema.bulkCreate(users);
};

usersDefinition()
  .then(() => {
    console.info(`Model: ${usersModel} was created!`);
  })
  .catch(err => console.error(err));
