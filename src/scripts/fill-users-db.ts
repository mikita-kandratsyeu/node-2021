import { sequelize } from '../data-access';
import { userSchema } from '../data-models';
import { usersMock } from '../mock';
import { usersModel, createModelMessage } from '../constants';
import { Logger } from '../../config';

const usersDefinition = async () => {
  await sequelize.authenticate();
  await userSchema.sync({ force: true });
  await userSchema.bulkCreate([...usersMock]);
};

usersDefinition()
  .then(() => {
    Logger.info(createModelMessage(usersModel));
  })
  .catch(err => Logger.error(err));
