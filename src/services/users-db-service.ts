import { Op } from 'sequelize';
import { groupSchema, userSchema } from '../data-models';
import { IUser } from '../types';
import { usersDefaultLimit } from '../constants';

export class UsersDbService {
  getAllUsers = async () =>
    userSchema.findAll({
      raw: true,
      order: [['login', 'ASC']],
      where: {
        isDeleted: false,
      },
      limit: usersDefaultLimit,
    });

  getUserById = async (id: string) => userSchema.findByPk(id);

  getAutoSuggestUser = async (loginSubstring: string, limit?: number) =>
    userSchema.findAll({
      where: {
        isDeleted: false,
        login: { [Op.iLike]: `%${loginSubstring}%` },
      },
      order: [['login', 'ASC']],
      limit: limit && usersDefaultLimit,
    });

  createUser = async (user: IUser) => userSchema.create(user);

  updateUser = async (targetUser: IUser, user: IUser) => {
    await userSchema.update(
      { ...user },
      {
        where: {
          id: targetUser.id,
        },
      },
    );
  };

  deleteUserById = async (id: string) => {
    await userSchema.update(
      {
        isDeleted: true,
      },
      {
        where: { id },
      },
    );
  };

  checkLoginExist = async (login: string) =>
    userSchema.findOne({
      where: {
        login,
      },
    });

  getUsersWithGroup = async (userId: string) =>
    userSchema.findByPk(userId, {
      include: {
        model: groupSchema,
        attributes: ['id', 'name', 'permissions'],
        through: { attributes: [] },
      },
    });
}
