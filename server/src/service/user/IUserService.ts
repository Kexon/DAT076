import { UserInfo, UserLevel } from "../../model/User";

export default interface IUserService {
  /*
   * Since we return the user everytime it performs an API call
   * we also want to return undefined if no user is found.
   */
  getUser(userId: string): Promise<UserInfo | undefined>;
  login(username: string, password: string): Promise<UserInfo | undefined>;
  register(username: string, password: string): Promise<UserInfo | undefined>;
  changePassword(
    userId: string,
    newPassword: string,
    currentPassword?: string
  ): Promise<boolean>;
  setUserLevel(
    userId: string,
    userIdToSet: string,
    level: UserLevel
  ): Promise<boolean>;
}
