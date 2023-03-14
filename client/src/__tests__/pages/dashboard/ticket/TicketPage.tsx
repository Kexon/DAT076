import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketPage from '../../../../pages/dashboard/ticket/TicketPage';
import axiosInstance from '../../../../utils/AxiosInstance';
import { MockUser, MockTicket, MockMessage } from '../../../../utils/Mock';

/*
 * We need to mock the AuthProvider because it needs a user to be logged in.
 * We also need to mock the useSearchParams hook because it needs a ticket id in the url.
 */
jest.mock('../../../../utils/AxiosInstance');
jest.mock('../../../../hooks/AuthProvider', () => ({
  useAuth: () => ({
    user: MockUser,
  }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams({ id: MockTicket.id })],
}));

const mockedAxios = axiosInstance as jest.Mocked<typeof axios>;

// prepare the response we want to get from axios
const mockedResponse: AxiosResponse = {
  data: MockTicket,
  status: 200,
  statusText: 'OK',
  headers: {} as AxiosResponseHeaders,
  config: {} as InternalAxiosRequestConfig,
};

// We also need to prepare the response for the messages, as TicketPage fetches the ticket messages.
const mockedMessageResponse: AxiosResponse = {
  data: [MockMessage], // TicketPage expects an array of messages
  status: 200,
  statusText: 'OK',
  headers: {} as AxiosResponseHeaders,
  config: {} as InternalAxiosRequestConfig,
};

describe('TicketPage', () => {
  test('should display ticket details', async () => {
    await act(async () => {
      mockedAxios.get
        .mockResolvedValueOnce(mockedResponse)
        .mockResolvedValueOnce(mockedMessageResponse);
      render(<TicketPage />, { wrapper: BrowserRouter });
    });

    const { title } = MockTicket;
    const { content } = MockMessage;
    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument(); // Check if the ticket title is displayed
      expect(screen.getByText(content)).toBeInTheDocument(); // Check if the ticket message is displayed
    });
  });
});
