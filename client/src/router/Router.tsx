import { createBrowserRouter, Navigate } from 'react-router-dom';
import Root from '../Root';
import UserPage from '../pages/dashboard/user/UserPage';
import RequireAuth from '../RequireAuth';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Navigate to="/user" />,
      },
      { path: 'login', element: <LoginPage /> },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      { path: '/user', element: <Navigate to="/user/tickets" /> },
      {
        path: '/user/:tab',
        element: (
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;
