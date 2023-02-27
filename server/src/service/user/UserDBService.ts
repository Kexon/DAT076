import { ObjectId } from "mongodb";
import { userModel } from "../../db/user.db";
import { UserInfo, UserLevel } from "../../model/User";
import IUserService from "./IUserService";

class UserDBService implements IUserService {
  async getUser(userId: string): Promise<UserInfo | undefined> {
    const user = await userModel.findById(new ObjectId(userId)).exec();
    if (!user) return undefined;
    return { username: user.username, level: user.level, id: userId };
  }

  async login(
    username: string,
    password: string
  ): Promise<UserInfo | undefined> {
    const user = await userModel.findOne({ username: username }).exec();
    if (user && user.password === password) {
      return {
        id: user._id.toString(),
        username: user.username,
        level: user.level,
      };
    }
    return undefined;
  }

  async register(
    username: string,
    password: string
  ): Promise<UserInfo | undefined> {
    const newUser = await userModel.create({
      username: username,
      password: password,
      level: UserLevel.USER,
    });
    return {
      id: newUser._id.toString(),
      username: newUser.username,
      level: newUser.level,
    };
  }

  async changePassword(
    userId: string,
    newPassword: string,
    currentPassword?: string
  ): Promise<boolean> {
    const user = await userModel.findById(new ObjectId(userId)).exec();
    console.log(currentPassword);
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
