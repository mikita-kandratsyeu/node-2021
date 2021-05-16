import { sequelize } from '../data-access';
import { groupSchema } from '../data-models';
import { groupsMock } from '../mock';
import { createModelMessage, groupsModel } from '../constants';
import { Logger } from '../../config';

const groupsDefinition = async () => {
  await sequelize.authenticate();
  await groupSchema.sync({ force: true });
  await groupSchema.bulkCreate([...groupsMock]);
};

groupsDefinition()
  .then(() => {
    Logger.info(createModelMessage(groupsModel));
  })
  .catch(err => Logger.error(err));
