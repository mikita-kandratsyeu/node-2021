import { IUser } from '../types';

export const sortByLogin = (users: IUser[]) =>
  users.sort((a: IUser, b: IUser): number => {
    const loginA = a.login.toLowerCase();
    const loginB = b.login.toLowerCase();

    if (loginA < loginB) return -1;

    if (loginA > loginB) return 1;

    return 0;
  });
