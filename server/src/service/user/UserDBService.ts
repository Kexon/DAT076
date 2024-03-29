import { ObjectId } from "mongodb";
import { userModel } from "../../db/user.db";
import { UserInfo, UserLevel } from "../../model/User";
import IUserService from "./IUserService";

/**
 * UserDBService is a class that handles all the requests to the database
 * related to the users.
 */
class UserDBService implements IUserService {
  async getAllUsers(requester: UserInfo): Promise<UserInfo[]> {
    if (requester.level !== UserLevel.SUPER_ADMIN) {
      throw new Error("You are not authorized to do this");
    }
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
    try {
      const newUser = await userModel.create({
        username: username,
        password: password,
        level: UserLevel.USER,
      });
      return newUser;
    } catch (e: any) {
      // assume this is a duplicate key error
      throw new Error("Username already exists");
    }
  }

  async changePassword(
    userId: string,
    userIdToSet: string,
    newPassword: string,
    currentPassword?: string
  ): Promise<boolean> {
    let user = await userModel
      .findById(new ObjectId(userId))
      .select("+password")
      .exec();
    if (
      user?.level === UserLevel.SUPER_ADMIN ||
      (user?.id === userIdToSet && user?.password === currentPassword)
    ) {
      if (userId !== userIdToSet) {
        user = await userModel.findById(new ObjectId(userIdToSet)).exec();
      }
      if (user) {
        user.password = newPassword;
        await user.save();
        return true;
      }
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
    throw new Error("Failed to set user level");
  }
}

export default function makeUserDBService(): IUserService {
  return new UserDBService();
}
