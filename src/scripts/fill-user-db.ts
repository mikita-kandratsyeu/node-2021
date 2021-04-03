import { sequelize } from '../data-access';
import { IUser, userSchema } from '../data-models/User';
import { usersMock } from '../mock';

const users: IUser[] = [...usersMock];

const usersDefinition = async () => {
  await sequelize.authenticate();
  await userSchema.sync({ force: true });
  await userSchema.bulkCreate(users);
};

usersDefinition()
  .then(() => {
    console.info('Table with users was created!');
  })
  .catch(err => console.error(err));
