import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../../../../utils/AxiosInstance';
import { Ticket } from '../../../../model/Ticket';
import { MockUser } from '../../../../utils/Mock';
import UserTickets from '../../../../pages/dashboard/user/UserTickets';

jest.mock('../../../../utils/AxiosInstance');
jest.mock('../../../../hooks/AuthProvider', () => ({
  useAuth: () => ({
    user: MockUser,
  }),
}));

const mockedAxios = axiosInstance as jest.Mocked<typeof axios>;

const mockedTickets: Ticket[] = [
  {
    id: '1',
    title: 'Mocked Ticket 1',
    description: 'This is a mocked ticket for testing purposes',
    open: true,
    owner: MockUser,
  },
  {
    id: '2',
    title: 'Mocked Ticket 2',
    description: 'This is another mocked ticket for testing purposes',
    open: false,
    owner: MockUser,
  },
];

// prepare the response we want to get from axios
const mockedResponse: AxiosResponse = {
  data: mockedTickets,
  status: 200,
  statusText: 'OK',
  headers: {} as AxiosResponseHeaders,
  config: {} as InternalAxiosRequestConfig,
};
describe('UserTickets', () => {
  test('should display list of user tickets', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    render(<UserTickets />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(/^Mocked Ticket 1$/)).toBeInTheDocument();
      expect(screen.getByText(/^Mocked Ticket 2$/)).toBeInTheDocument();
    });
  });
});
