import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Ticket } from '../../../../../model/Ticket';
import AllTicketsPage from '../../../../../pages/dashboard/admin/tickets/AllTicketsPage';
import { MockUser } from '../../../../../utils/Mock';
import axiosInstance from '../../../../../utils/AxiosInstance';

jest.mock('../../../../../utils/AxiosInstance');
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
describe('AllTicketsPage', () => {
  test('should display list of tickets', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    render(<AllTicketsPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(/^Mocked Ticket 1$/)).toBeInTheDocument();
      expect(screen.getByText(/^Mocked Ticket 2$/)).toBeInTheDocument();
    });
  });

  test('should only show open tickets when sorting by open', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    render(<AllTicketsPage />, { wrapper: BrowserRouter });
    const sortByOpenTicketsButton = screen.getByRole('button', {
      name: /Open/i,
    });
    // Wait for the component to finish rendering and the data to be fetched
    await waitFor(() => {
      expect(screen.getByText(/^Mocked Ticket 1$/)).toBeInTheDocument();
      expect(screen.getByText(/^Mocked Ticket 2$/)).toBeInTheDocument();
    });

    // Simulate click event on "Open" button
    await act(async () => {
      fireEvent.click(sortByOpenTicketsButton);
    });

    // Wait for the component to re-render after sorting
    await waitFor(() => {
      expect(screen.getByText(/^Mocked Ticket 1$/)).toBeInTheDocument();
      /*
       * You need to queryByText instead of getByText to
       * make sure the element is not in the document. Took me an hour to figure this out.
       */
      expect(screen.queryByText(/^Mocked Ticket 2$/)).not.toBeInTheDocument();
    });
  });

  test('should only show closed tickets when sorting by closed', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    render(<AllTicketsPage />, { wrapper: BrowserRouter });
    const sortByClosedTicketsButton = screen.getByRole('button', {
      name: /Closed/i,
    });
    // Wait for the component to finish rendering and the data to be fetched
    await waitFor(() => {
      expect(screen.getByText(/^Mocked Ticket 1$/)).toBeInTheDocument();
      expect(screen.getByText(/^Mocked Ticket 2$/)).toBeInTheDocument();
    });

    // Simulate click event on "Open" button
    await act(async () => {
      fireEvent.click(sortByClosedTicketsButton);
    });

    // Wait for the component to re-render after sorting
    await waitFor(() => {
      /*
       * You need to queryByText instead of getByText to
       * make sure the element is not in the document. Took me an hour to figure this out.
       */
      expect(screen.queryByText(/^Mocked Ticket 1$/)).not.toBeInTheDocument();
      expect(screen.getByText(/^Mocked Ticket 2$/)).toBeInTheDocument();
    });
  });
});
