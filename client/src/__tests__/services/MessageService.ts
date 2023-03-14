import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import Message from '../../model/Message';
import MessageService from '../../services/MessageService';
import axiosInstance from '../../utils/AxiosInstance';
import { MockMessage } from '../../utils/Mock';

jest.mock('../../utils/AxiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axios>;

describe('getMessages()', () => {
  test('should return a list of messages', async () => {
    const messages: Message[] = [MockMessage];

    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: messages,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.get).not.toHaveBeenCalled();
    const data = await MessageService.getMessages('1');
    expect(axiosInstance.get).toHaveBeenCalled();
    expect(data).toEqual(messages);
  });
});

describe('sendMessage()', () => {
  test('should return a message', async () => {
    const message: Message = MockMessage;
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
    const data = await MessageService.sendMessage('1', 'Hello');
    expect(axiosInstance.post).toHaveBeenCalled();
    expect(data).toEqual(message);
  });
});
