import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../../pages/dashboard/Dashboard';
import { MockUser } from '../../../utils/Mock';

jest.mock('../../../hooks/AuthProvider', () => ({
  useAuth: () => ({
    user: MockUser,
  }),
}));

describe('Dashboard', () => {
  test('Should render the dashboard page', () => {
    render(<Dashboard />, { wrapper: BrowserRouter });
    const titleElement = screen.getByText(/^Account panel$/);
    expect(titleElement).toBeInTheDocument();
  });

  // For some reason, adding a second test leads to weird conflicts
  /* test('Should render the buttons', () => {
    render(<Dashboard />, { wrapper: BrowserRouter });
    const titleElement = screen.getByText(/^Account panel$/);
    expect(titleElement).toBeInTheDocument();
  }); */
});
