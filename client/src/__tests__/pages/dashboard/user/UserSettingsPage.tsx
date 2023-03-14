import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import UserSettingsPage from '../../../../pages/dashboard/user/UserSettingsPage';

test('Display all input fields.', () => {
  render(<UserSettingsPage />, { wrapper: BrowserRouter });
  expect(screen.getByLabelText('New password *')).toBeInTheDocument();
  expect(screen.getByLabelText('Repeat password *')).toBeInTheDocument();
  expect(screen.getByLabelText('Current password *')).toBeInTheDocument();
});

/*
 * userEvent simulates complete interactions, and not only single events.
 * compared to fireEvent which will will only trigger a specific event
 */
test('Write to input fields.', () => {
  render(<UserSettingsPage />, { wrapper: BrowserRouter });
  userEvent.type(screen.getByLabelText('New password *'), 'hello');
  userEvent.type(screen.getByLabelText('Repeat password *'), 'hellon');
  userEvent.type(screen.getByLabelText('Current password *'), 'test');
  expect(screen.getByLabelText('New password *')).toHaveValue('hello');
  expect(screen.getByLabelText('Repeat password *')).toHaveValue('hellon');
  expect(screen.getByLabelText('Current password *')).toHaveValue('test');
});

test('Submit form with invalid data.', () => {
  render(<UserSettingsPage />, { wrapper: BrowserRouter });
  userEvent.type(screen.getByLabelText('New password *'), 'hello');
  userEvent.type(screen.getByLabelText('Repeat password *'), 'hellon');
  userEvent.type(screen.getByLabelText('Current password *'), 'test');
  userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  waitFor(() => {
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});

test('Submit form with empty fields', () => {
  render(<UserSettingsPage />, { wrapper: BrowserRouter });
  userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  waitFor(() => {
    expect(screen.getByText('Please fill out both fields')).toBeInTheDocument();
  });
});

// We do not check if changing the password works, because we haven't
// implemented it in front end yet.
