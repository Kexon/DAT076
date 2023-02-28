export interface User {
  id: string;
  level: number;
  username: string;
  password: string;
}

export enum UserLevel {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}

export interface NewUser extends Omit<User, "id"> {}
export interface UserInfo extends Omit<User, "password"> {}
