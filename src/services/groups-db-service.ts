import { groupSchema, userGroupSchema } from '../data-models';
import { usersDefaultLimit } from '../constants';
import { IGroup, IGroupCreationInstance, IGroupInstance } from '../types';
import { sequelize } from '../data-access';

export class GroupsDbService {
  getAllGroups = async () =>
    groupSchema.findAll({
      order: [['name', 'ASC']],
      limit: usersDefaultLimit,
    });

  getGroupById = async (id: string) => groupSchema.findByPk(id);

  createGroup = async (group: IGroupCreationInstance) =>
    groupSchema.create(group);

  updateGroup = async (targetGroup: IGroupInstance, group: IGroup) => {
    await groupSchema.update({ ...group }, { where: { id: targetGroup.id } });
  };

  deleteGroup = async (targetGroup: IGroupInstance) => {
    await targetGroup.destroy();
  };

  checkNameExist = async (name: string) =>
    groupSchema.findOne({ where: { name } });

  addUsersToGroup = async (groupId: string, userIds: string[]) => {
    const transact = await sequelize.transaction();

    try {
      await userGroupSchema.destroy({
        where: { groupId },
        transaction: transact,
      });

      const userGroupRelations = userIds.map(userId => ({ userId, groupId }));

      await userGroupSchema.bulkCreate(userGroupRelations, {
        transaction: transact,
      });

      await transact.commit();
    } catch (err) {
      await transact.rollback();

      throw err;
    }
  };
}
