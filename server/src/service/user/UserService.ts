import { User, UserInfo } from "../../model/User";
import IUserService from "./IUserService";
import { v4 as uuidv4 } from "uuid";

const users = new Map<string, User>();

class UserService implements IUserService {
  async getUser(userId: string): Promise<UserInfo | undefined> {
    const user = users.get(userId);
    return user ? { id: user.id, username: user.username } : undefined;
  }

  async login(
    username: string,
    password: string
  ): Promise<UserInfo | undefined> {
    const userId = await this.getIdByUsername(username);
    if (userId) {
      const user = users.get(userId);
      if (user && user.password === password)
        return { id: user.id, username: user.username };
    }
    return undefined;
  }

  async register(
    username: string,
    password: string
  ): Promise<UserInfo | undefined> {
    if ((await this.getIdByUsername(username)) !== undefined) return undefined;
    const newUser: User = {
      id: uuidv4(),
      username: username,
      password: password,
    };
    users.set(newUser.id, newUser);
    return { id: newUser.id, username: newUser.username };
  }

  /*
   * Do we really need to return the user here?
   * Also do we perform user is logged in here or the router?
   * CHATGPT: Overall, checking for user authentication at the router level is a
   * good first step in securing your changepassword service, but it's not the only step.
   * */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<UserInfo | undefined> {
    const user = users.get(userId);
    if (user && user.password === currentPassword) {
      user.password = newPassword;
      return { id: user.id, username: user.username };
    }
    return undefined;
  }

  private async getIdByUsername(username: string): Promise<string | undefined> {
    for (const user of users.values())
      if (user.username === username) return user.id;
    return undefined;
  }
}

export default function makeUserService(): IUserService {
  return new UserService();
}
