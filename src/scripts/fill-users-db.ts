import { sequelize } from '../data-access';
import { IUser, userSchema } from '../data-models';
import { usersMock } from '../mock';
import { usersModel, createModelMessage } from '../constants';

const users: IUser[] = [...usersMock];

const usersDefinition = async () => {
  await sequelize.authenticate();
  await userSchema.sync({ force: true });
  await userSchema.bulkCreate(users);
};

usersDefinition()
  .then(() => {
    console.info(createModelMessage(usersModel));
  })
  .catch(err => console.error(err));
