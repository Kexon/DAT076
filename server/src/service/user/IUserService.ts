import { UserInfo } from "../../model/User";

export default interface IUserService {
  getUser(userId: string): Promise<UserInfo | undefined>;
  login(username: string, password: string): Promise<UserInfo | undefined>;
  register(username: string, password: string): Promise<UserInfo | undefined>;
}
