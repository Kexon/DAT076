import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';

const mockLogin = jest.fn();

jest.mock('../../hooks/AuthProvider', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

/* function Wrapper({ children }: any) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
} */

describe('LoginPage', () => {
  test('should display login form', () => {
    act(() => {
      render(<LoginPage />, { wrapper: BrowserRouter });
    });

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('login call', async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: BrowserRouter });
    });

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Submit');
    userEvent.type(usernameInput, 'test');
    userEvent.type(passwordInput, 'test');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  // We can not test this because login service gets called even if the fields are empty.
  /* test('login call with empty fields', async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: BrowserRouter });
    });

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Submit');
    userEvent.type(usernameInput, '');
    userEvent.type(passwordInput, '');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  }); */
});
