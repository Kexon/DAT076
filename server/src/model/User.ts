export interface User {
  id: string;
  username: string;
  password: string;
}

export interface NewUser extends Omit<User, "id"> {}
export interface UserInfo extends Omit<User, "password"> {}
