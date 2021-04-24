// Numerical constants
export const usersDefaultLimit: number = 100;

// Model names
export const usersModel: string = 'Users';
export const groupsModel: string = 'Groups';

// Server response messages
export const notFoundMessage: string = 'Sorry cant find that!';
export const errorMessage: string = 'Something went wrong!';
export const specifiedLoginMessage: string =
  'The login you specified is busy! Try again!';
export const specifiedNameMessage: string =
  'The name you specified is busy! Try again!';
export const userIdErrorMessage: string = "User's id cannot be changed!";

// Generate different messages
export const updateUserMessage = (userId: string): string =>
  `User with the id: ${userId} has been updated!`;
export const startServerMessage = (port: number | string): string =>
  `Server running on port: http://localhost:${port}`;
export const createModelMessage = (nameOfModel: string): string =>
  `Model: ${nameOfModel} was created!`;
