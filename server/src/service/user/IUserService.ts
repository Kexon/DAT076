import { UserInfo, UserLevel } from "../../model/User";

/**
 * IUserService is an interface that defines the methods that the UserService
 * should implement.
 */
export default interface IUserService {
  /*
   * Since we return the user everytime it performs an API call
   * we also want to return undefined if no user is found.
   */
  getUser(userId: string): Promise<UserInfo>;
  getAllUsers(): Promise<UserInfo[]>;
  login(username: string, password: string): Promise<UserInfo>;
  register(username: string, password: string): Promise<UserInfo>;
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
