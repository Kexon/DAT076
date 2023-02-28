import { User, UserInfo, UserLevel } from "../../model/User";
import IUserService from "./IUserService";
import { v4 as uuidv4 } from "uuid";

const users = new Map<string, User>();

class UserService implements IUserService {
  async getUser(userId: string): Promise<UserInfo | undefined> {
    const user = users.get(userId);
    return user
      ? { id: user.id, username: user.username, level: user.level }
      : undefined;
  }

  async login(
    username: string,
    password: string
  ): Promise<UserInfo | undefined> {
    const userId = await this.getIdByUsername(username);
    if (userId) {
      const user = users.get(userId);
      if (user && user.password === password) {
        return { id: user.id, username: user.username, level: user.level };
      }
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
      level: 1,
      username: username,
      password: password,
    };
    users.set(newUser.id, newUser);
    return { id: newUser.id, username: newUser.username, level: newUser.level };
  }

  async changePassword(
    userId: string,
    newPassword: string,
    currentPassword?: string
  ): Promise<boolean> {
    const user = users.get(userId);
    if (
      user &&
      (user.password === currentPassword ||
        user?.level === UserLevel.SUPER_ADMIN)
    ) {
      user.password = newPassword;
      return true;
    }
    return false;
  }

  private async getIdByUsername(username: string): Promise<string | undefined> {
    for (const user of users.values())
      if (user.username === username) return user.id;
    return undefined;
  }

  async setUserLevel(
    userId: string,
    userIdToSet: string,
    level: UserLevel
  ): Promise<boolean> {
    const user = users.get(userId);
    if (user && user.level === UserLevel.SUPER_ADMIN) {
      // only super admins can set user levels
      const userToSet = users.get(userIdToSet);
      if (userToSet) {
        userToSet.level = level;
        return true;
      }
    }
    return false;
  }
}

export default function makeUserService(): IUserService {
  return new UserService();
}
