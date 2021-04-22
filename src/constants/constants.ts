export const usersDefaultLimit: number = 100;

export const usersModel: string = 'Users';
export const groupsModel: string = 'Groups';
export const notFoundMessage: string = 'Sorry cant find that!';
export const errorMessage: string = 'Something went wrong!';
export const specifiedLoginMessage: string =
  'The login you specified is busy! Try again!';
export const userIdErrorMessage: string = "User's id cannot be changed!";
export const updateUserMessage = (userId: string): string =>
  `User with the id: ${userId} has been updated!`;
export const startServerMessage = (port: number | string): string =>
  `Server running on port: http://localhost:${port}`;
export const createModelMessage = (nameOfModel: string): string =>
  `Model: ${nameOfModel} was created!`;
