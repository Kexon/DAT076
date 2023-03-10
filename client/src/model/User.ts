/**
 * User level enum
 * This enum is used to represent the user level
 * @property {number} USER - User level 1
 * @property {number} ADMIN - User level 2
 * @property {number} SUPER_ADMIN - User level 3
 */
/* eslint-disable @typescript-eslint/no-empty-interface */
export enum UserLevel {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}
/**
 * User info model
 * This model is used to represent a user in the frontend
 * @property {string} id - User id
 * @property {string} username - User username
 * @property {UserLevel} level - User level
 */
export interface UserInfo {
  id: string;
  username: string;
  level: UserLevel;
}

/**
 * New user model
 * This model is used to represent a new user in the frontend
 * and omits the id property because it is not needed when
 * creating a new user
 * @property {string} username - User username
 * @property {UserLevel} level - User level
 */
export interface NewUser extends Omit<UserInfo, 'id'> {}
