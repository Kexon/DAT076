import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import { UserInfo, UserLevel } from '../model/User';
import AllUsersPage from '../pages/dashboard/admin/users/AllUsersPage';

jest.mock('../utils/AxiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axios>;

const mockedUsers: UserInfo[] = [
  {
    id: '1',
    username: 'user1',
    level: UserLevel.USER,
  },
  {
    id: '2',
    username: 'user2',
    level: UserLevel.ADMIN,
  },
  {
    id: '3',
    username: 'user3',
    level: UserLevel.SUPER_ADMIN,
  },
];

// prepare the response we want to get from axios
const mockedResponse: AxiosResponse = {
  data: mockedUsers,
  status: 200,
  statusText: 'OK',
  headers: {} as AxiosResponseHeaders,
  config: {} as InternalAxiosRequestConfig,
};
describe('AllUsersPage', () => {
  test('should display list of users', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    render(<AllUsersPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(/^user1$/)).toBeInTheDocument();
      expect(screen.getByText(/^user2$/)).toBeInTheDocument();
      expect(screen.getByText(/^user3$/)).toBeInTheDocument();
    });
  });

  test('should only show regular users when sorting by regular', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    render(<AllUsersPage />, { wrapper: BrowserRouter });
    const sortByOpenTicketsButton = screen.getByRole('button', {
      name: /Regular/i,
    });
    // Wait for the component to finish rendering and the data to be fetched
    await waitFor(() => {
      expect(screen.getByText(/^user1$/)).toBeInTheDocument();
      expect(screen.getByText(/^user2$/)).toBeInTheDocument();
      expect(screen.getByText(/^user3$/)).toBeInTheDocument();
    });

    // Simulate click event on "Open" button
    await act(async () => {
      fireEvent.click(sortByOpenTicketsButton);
    });

    // Wait for the component to re-render after sorting
    await waitFor(() => {
      expect(screen.getByText(/^user1$/)).toBeInTheDocument();
      /*
       * You need to queryByText instead of getByText to
       * make sure the element is not in the document. Took me an hour to figure this out.
       */
      expect(screen.queryByText(/^user2$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^user3$/)).not.toBeInTheDocument();
    });
  });

  test('should only show admins when sorting by admin', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    render(<AllUsersPage />, { wrapper: BrowserRouter });
    const sortByAdminsButton = screen.getByRole('button', {
      name: /Admin/i,
    });
    // Wait for the component to finish rendering and the data to be fetched
    await waitFor(() => {
      expect(screen.getByText(/^user1$/)).toBeInTheDocument();
      expect(screen.getByText(/^user2$/)).toBeInTheDocument();
      expect(screen.getByText(/^user3$/)).toBeInTheDocument();
    });

    // Simulate click event on "Open" button
    await act(async () => {
      fireEvent.click(sortByAdminsButton);
    });

    // Wait for the component to re-render after sorting
    await waitFor(() => {
      /*
       * You need to queryByText instead of getByText to
       * make sure the element is not in the document. Took me an hour to figure this out.
       */
      expect(screen.queryByText(/^user1$/)).not.toBeInTheDocument();
      expect(screen.getByText(/^user2$/)).toBeInTheDocument();
      expect(screen.getByText(/^user3$/)).toBeInTheDocument();
    });
  });
});
