import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketPage from '../pages/dashboard/ticket/TicketPage';
import axiosInstance from '../utils/AxiosInstance';
import { MockMessage, MockTicket, MockUser } from '../utils/Mock';

jest.mock('../utils/AxiosInstance');
jest.mock('../hooks/AuthProvider', () => ({
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

const mockedMessageResponse: AxiosResponse = {
  data: [MockMessage],
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
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });
});
