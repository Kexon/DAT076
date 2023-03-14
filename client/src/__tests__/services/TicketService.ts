// src/api/index.spec.ts
import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { Ticket } from '../../model/Ticket';
import TicketService from '../../services/TicketService';
import { MockTicket } from '../../utils/Mock';
import axiosInstance from '../../utils/AxiosInstance';

jest.mock('../../utils/AxiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axios>;

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
    expect(axiosInstance.get).not.toHaveBeenCalled();
    const data = await TicketService.getTickets();
    expect(axiosInstance.get).toHaveBeenCalled();
    expect(data).toEqual(ticket);
  });
});
