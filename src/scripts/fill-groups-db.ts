import { sequelize } from '../data-access';
import { groupSchema } from '../data-models';
import { groupsMock } from '../mock';
import { createModelMessage, groupsModel } from '../constants';

const groupsDefinition = async () => {
  await sequelize.authenticate();
  await groupSchema.sync({ force: true });
  await groupSchema.bulkCreate([...groupsMock]);
};

groupsDefinition()
  .then(() => {
    console.info(createModelMessage(groupsModel));
  })
  .catch(err => console.error(err));
