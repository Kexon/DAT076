import { UserInfo } from '../model/User';
import axiosInstance from '../utils/AxiosInstance';

export default class UserService {
  static async getUser(): Promise<UserInfo | undefined> {
    try {
      const { data } = await axiosInstance.get<UserInfo>('/user');
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
}
