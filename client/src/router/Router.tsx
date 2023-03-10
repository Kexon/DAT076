import { createBrowserRouter, Navigate } from 'react-router-dom';
import Root from '../Root';
import Dashboard from '../pages/dashboard/Dashboard';
import RequireAuth from '../RequireAuth';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
/**
 * This is the main router for the application. It contains all the routes for
 * the application.
 */
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
            <Dashboard />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;
