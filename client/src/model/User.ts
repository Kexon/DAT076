/* eslint-disable @typescript-eslint/no-empty-interface */
export enum UserLevel {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}

export interface UserInfo {
  id: string;
  username: string;
  level: UserLevel;
}

export interface NewUser extends Omit<UserInfo, 'id'> {}
