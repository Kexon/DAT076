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

/**
 * NewUser is a class that represents a new user that is sent to the server.
 * It is used to create a new user in the database, and does not contain the id as this is generated on creation.
 */
export interface NewUser extends Omit<User, "id"> {}

/**
 * UserInfo is a class that represents a user that is sent to the client.
 * It is used to send a user to the client, and does not contain the password for security reasons.
 */
export interface UserInfo extends Omit<User, "password"> {}
