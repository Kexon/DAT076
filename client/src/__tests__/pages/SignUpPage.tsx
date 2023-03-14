import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import { Sign } from 'crypto';

const mockSignup = jest.fn();

jest.mock('../../hooks/AuthProvider', () => ({
  useAuth: () => ({
    register: mockSignup,
  }),
}));

describe('SignUpPage', () => {
  test('should display sign up form', () => {
    act(() => {
      render(<SignUpPage />, { wrapper: BrowserRouter });
    });

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Repeat password')).toBeInTheDocument();
  });

  test('sign up', async () => {
    await act(async () => {
      render(<SignUpPage />, { wrapper: BrowserRouter });
    });

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const repeatPasswordInput = screen.getByLabelText('Repeat password');
    const submitButton = screen.getByText('Register new account');
    userEvent.type(usernameInput, 'test');
    userEvent.type(passwordInput, 'test');
    userEvent.type(repeatPasswordInput, 'test');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalled();
    });
  });

  // We can not test this because login service gets called even if the fields are empty.
  test('login call with empty fields', async () => {
    await act(async () => {
      render(<SignUpPage />, { wrapper: BrowserRouter });
    });

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const repeatPasswordInput = screen.getByLabelText('Repeat password');
    const submitButton = screen.getByText('Register new account');
    userEvent.type(usernameInput, ' ');
    userEvent.type(passwordInput, ' ');
    userEvent.type(repeatPasswordInput, ' ');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).not.toHaveBeenCalled();
    });
  });

  test('login call with mismatching passwords', async () => {
    await act(async () => {
      render(<SignUpPage />, { wrapper: BrowserRouter });
    });

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const repeatPasswordInput = screen.getByLabelText('Repeat password');
    const submitButton = screen.getByText('Register new account');
    userEvent.type(usernameInput, 'test');
    userEvent.type(passwordInput, 'tea');
    userEvent.type(repeatPasswordInput, 'teon');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).not.toHaveBeenCalled();
    });
  });
});
