import { ObjectId } from "mongodb";
import { userModel } from "../../db/user.db";
import { UserInfo, UserLevel } from "../../model/User";
import IUserService from "./IUserService";

class UserDBService implements IUserService {
  async getAllUsers(): Promise<UserInfo[]> {
    try {
      const users = await userModel.find();
      return users;
    } catch (e: any) {
      return [];
    }
  }

  async getUser(userId: string): Promise<UserInfo> {
    const user = await userModel.findById(new ObjectId(userId)).exec();
    if (!user) throw new Error("User not found");
    return user;
  }

  async login(username: string, password: string): Promise<UserInfo> {
    const user = await userModel
      .findOne({ username: username })
      .select("+password") // this is needed to select the password field
      .exec();
    if (user && user.password === password) {
      return {
        id: user.id,
        username: user.username,
        level: user.level,
      };
    }
    throw new Error("Invalid username or password");
  }

  async register(username: string, password: string): Promise<UserInfo> {
    const newUser = await userModel.create({
      username: username,
      password: password,
      level: UserLevel.USER,
    });
    return newUser;
  }

  async changePassword(
    userId: string,
    newPassword: string,
    currentPassword?: string
  ): Promise<boolean> {
    const user = await userModel
      .findById(new ObjectId(userId))
      .select("+password")
      .exec();
    if (
      user &&
      (user.password === currentPassword ||
        user.level === UserLevel.SUPER_ADMIN) // super admins can set passwords without knowing the current password
    ) {
      user.password = newPassword;
      await user.save();
      return true;
    }
    return false;
  }
  async setUserLevel(
    userId: string,
    userIdToSet: string,
    level: UserLevel
  ): Promise<boolean> {
    const user = await userModel.findById(new ObjectId(userId)).exec();
    if (user?.level === UserLevel.SUPER_ADMIN) {
      // only super admins can set user levels
      const userToSet = await userModel
        .findById(new ObjectId(userIdToSet))
        .exec();
      if (userToSet) {
        userToSet.level = level;
        await userToSet.save();
        return true;
      }
    }
    return false;
  }
}

export default function makeUserDBService(): IUserService {
  return new UserDBService();
}
