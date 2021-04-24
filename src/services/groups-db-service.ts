import { groupSchema } from '../data-models';
import { usersDefaultLimit } from '../constants';
import { IGroup, IGroupCreationInstance, IGroupInstance } from '../types';

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
}
