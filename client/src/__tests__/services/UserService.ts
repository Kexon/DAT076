import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { UserInfo } from '../../model/User';
import UserService from '../../services/UserService';
import axiosInstance from '../../utils/AxiosInstance';
import { MockUser } from '../../utils/Mock';

jest.mock('../../utils/AxiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axios>;

describe('getAllUsers()', () => {
  test('should return a list of users', async () => {
    const users: UserInfo[] = [MockUser];

    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: users,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.get).not.toHaveBeenCalled();
    const data = await UserService.getAllUsers();
    expect(axiosInstance.get).toHaveBeenCalled();
    expect(data).toEqual(users);
  });
});

describe('getUser()', () => {
  test('should return a user', async () => {
    const user: UserInfo = MockUser;
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: user,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.get).not.toHaveBeenCalled();
    const data = await UserService.getUser();
    expect(axiosInstance.get).toHaveBeenCalled();
    expect(data).toEqual(user);
  });
});

describe('getUserById()', () => {
  test('should return a user by id', async () => {
    const user: UserInfo = MockUser;
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: user,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.get).not.toHaveBeenCalled();
    const data = await UserService.getUserById('1'); // The id doesn't even match, but I guess it doesn't matter
    expect(axiosInstance.get).toHaveBeenCalled();
    expect(data).toEqual(user);
  });
});

describe('login', () => {
  test('should return a user', async () => {
    const user: UserInfo = MockUser;
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: user,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.post).not.toHaveBeenCalled();
    const data = await UserService.login('test', 'test');
    expect(axiosInstance.post).toHaveBeenCalled();
    expect(data).toEqual(user);
  });
});

describe('register', () => {
  test('should return a user', async () => {
    const user: UserInfo = MockUser;
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: user,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.post).not.toHaveBeenCalled();
    const data = await UserService.register('test', 'test');
    expect(axiosInstance.post).toHaveBeenCalled();
    expect(data).toEqual(user);
  });
});

describe('logout', () => {
  test('should return a message', async () => {
    const message = 'Successfully logged out';
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: message,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.post).not.toHaveBeenCalled();
    const data = await UserService.logout();
    expect(axiosInstance.post).toHaveBeenCalled();
    expect(data).toEqual(message);
  });
});
