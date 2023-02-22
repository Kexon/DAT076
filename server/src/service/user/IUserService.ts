import { UserInfo } from "../../model/User";

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
    password: string
  ): Promise<UserInfo | undefined>;
}
