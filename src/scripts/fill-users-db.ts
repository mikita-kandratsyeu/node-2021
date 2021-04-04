import { sequelize } from '../data-access';
import { userSchema } from '../data-models';
import { usersMock } from '../mock';
import { usersModel, createModelMessage } from '../constants';

const usersDefinition = async () => {
  await sequelize.authenticate();
  await userSchema.sync({ force: true });
  await userSchema.bulkCreate([...usersMock]);
};

usersDefinition()
  .then(() => {
    console.info(createModelMessage(usersModel));
  })
  .catch(err => console.error(err));
