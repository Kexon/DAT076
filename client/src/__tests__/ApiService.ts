// src/api/index.spec.ts
import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { Ticket } from '../model/Ticket';
import ApiService from '../services/ApiService';
import MockTicket from '../utils/MockTicket';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getTickets()', () => {
  test('should return tickets list', async () => {
    const ticket: Ticket[] = [MockTicket];

    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: ticket,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axios.get).not.toHaveBeenCalled();
    const data = await ApiService.getTickets();
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(ticket);
  });
});
