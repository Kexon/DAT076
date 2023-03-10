import { UserInfo } from '../model/User';
import axiosInstance from '../utils/AxiosInstance';

/**
 * UserService is a class that handles all the requests to the server
 * related to the users.
 */
export default class UserService {
  static async getAllUsers(): Promise<UserInfo[]> {
    try {
      const { data } = await axiosInstance.get<UserInfo[]>('/user/all');
      return data;
    } catch (error) {
      return [];
    }
  }

  static async getUser(): Promise<UserInfo | undefined> {
    try {
      const { data } = await axiosInstance.get<UserInfo>('/user');
      return data;
    } catch (error) {
      return undefined;
    }
  }

  static async getUserById(id: string): Promise<UserInfo | undefined> {
    try {
      const { data } = await axiosInstance.get<UserInfo>(`/user/${id}`);
      return data;
    } catch (error) {
      return undefined;
    }
  }

  static async login(
    username: string,
    password: string,
  ): Promise<UserInfo | undefined> {
    const { data } = await axiosInstance.post<UserInfo>('/user/login', {
      username,
      password,
    });
    return data;
  }

  static async register(
    username: string,
    password: string,
  ): Promise<UserInfo | undefined> {
    const { data } = await axiosInstance.post<UserInfo>('/user', {
      username,
      password,
    });
    return data;
  }

  static async logout(): Promise<string> {
    const { data } = await axiosInstance.post<string>('/user/logout');
    return data;
  }
}
