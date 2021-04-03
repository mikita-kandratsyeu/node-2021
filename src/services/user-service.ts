import { Op } from 'sequelize';
import { IUser, userSchema } from '../data-models/User';
import { usersDefaultLimit } from '../constants';

export const getAllUsers = async () =>
  userSchema.findAll({
    raw: true,
    order: [['login', 'ASC']],
    limit: usersDefaultLimit,
  });

export const getUserById = async (id: string) => userSchema.findByPk(id);

export const getAutoSuggestUser = async (
  loginSubstring: string,
  limit?: number,
) =>
  userSchema.findAll({
    where: {
      isDeleted: false,
      login: { [Op.like]: `%${loginSubstring}%` },
    },
    order: [['login', 'ASC']],
    limit: limit && usersDefaultLimit,
  });

export const createUser = async (user: IUser) => userSchema.create(user);

export const updateUser = async (targetUser: IUser, user: IUser) => {
  await userSchema.update(
    { ...user },
    {
      where: {
        id: targetUser.id,
      },
    },
  );
};

export const deleteUserById = async (id: string) => {
  await userSchema.update(
    {
      isDeleted: true,
    },
    {
      where: { id },
    },
  );
};
