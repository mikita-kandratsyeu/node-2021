export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
