// Numerical constants
export const usersDefaultLimit: number = 100;

// Model names
export const usersModel: string = 'Users';
export const groupsModel: string = 'Groups';
export const userGroupModel: string = 'UserGroup';

// Server response messages
export const notFoundMessage: string = 'Sorry cant find that!';
export const errorMessage: string = 'Something went wrong!';
export const specifiedLoginMessage: string =
  'The login you specified is busy! Try again!';
export const specifiedNameMessage: string =
  'The name you specified is busy! Try again!';
export const userIdErrorMessage: string = "User's id cannot be changed!";
export const groupIdErrorMessage: string = "Group's id cannot be changed!";

// Generate different messages
export const updateUserMessage = (userId: string): string =>
  `User with the id: ${userId} has been updated!`;
export const updateGroupMessage = (groupId: string): string =>
  `Group with the id: ${groupId} has been updated!`;
export const startServerMessage = (
  port: number | string,
  hostname: string,
): string => `Server running on port: ${hostname}:${port}`;
export const createModelMessage = (nameOfModel: string): string =>
  `Model: ${nameOfModel} was created!`;
export const addUsersToGroupMessage = (
  groupId: string,
  userIds: string[],
): string => `Users with id: ${userIds} was added to group with id: ${groupId}`;

// Auth
export const forbiddenError: string = 'Forbidden Error';
export const unauthorizedError: string = 'Unauthorized Error';
export const incorrectPasswordOrLogin: string = 'Incorrect Password or Login';

// Status codes
export enum statusCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
