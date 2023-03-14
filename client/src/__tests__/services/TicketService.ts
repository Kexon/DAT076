// src/api/index.spec.ts
import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { Ticket } from '../../model/Ticket';
import TicketService from '../../services/TicketService';
import { MockTicket, MockUser } from '../../utils/Mock';
import axiosInstance from '../../utils/AxiosInstance';

jest.mock('../../utils/AxiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axios>;

describe('getTickets()', () => {
  test('should return a list of tickets', async () => {
    const tickets: Ticket[] = [MockTicket];

    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: tickets,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.get).not.toHaveBeenCalled();
    const data = await TicketService.getTickets();
    expect(axiosInstance.get).toHaveBeenCalled();
    expect(data).toEqual(tickets);
  });
});

describe('getTicket()', () => {
  test('should return a ticket', async () => {
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

/* To be honest, I don't know what we're testing here. The axios call?
 * We're preparing the response we want to get, so it doesn't matter if
 * the author id of the ticket and the user id matches.
 */
describe('getTicketsByAuthorId()', () => {
  test('should return a list of tickets from author', async () => {
    const ticket: Ticket[] = [MockTicket];
    const { id } = MockUser;

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
    const data = await TicketService.getTicketsByAuthorId(id);
    expect(axiosInstance.get).toHaveBeenCalled();
    expect(data).toEqual(ticket);
  });
});

describe('createTicket()', () => {
  test('should create a ticket', async () => {
    const ticket: Ticket = MockTicket;
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: ticket,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.post).not.toHaveBeenCalled();
    const data = await TicketService.createTicket(ticket);
    expect(axiosInstance.post).toHaveBeenCalled();
    expect(data).toEqual(ticket);
  });
});

describe('closeTicket()', () => {
  test('should close a ticket', async () => {
    const ticket: Ticket = MockTicket;
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: ticket,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.patch.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.patch).not.toHaveBeenCalled();
    await TicketService.closeTicket(ticket.id);
    expect(axiosInstance.patch).toHaveBeenCalled();
  });
});

describe('openTicket()', () => {
  test('should open a ticket', async () => {
    const ticket: Ticket = MockTicket;
    // prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: ticket,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    mockedAxios.patch.mockResolvedValueOnce(mockedResponse);
    expect(axiosInstance.patch).not.toHaveBeenCalled();
    await TicketService.openTicket(ticket.id);
    expect(axiosInstance.patch).toHaveBeenCalled();
  });
});
