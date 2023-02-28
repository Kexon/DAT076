import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminTicketsPage from '../pages/admin/tickets/AdminTicketsPage';
import TicketPage from '../pages/admin/tickets/TicketPage';
import TicketFormPage from '../pages/user/TicketFormPage';
import Root from '../Root';
import UserPage from '../pages/user/dashboard/UserPage';
import RequireAuth from '../RequireAuth';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import UserPageSettings from '../pages/user/dashboard/UserPageSettings';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Navigate to="/user/dashboard" />,
      },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'createticket',
        element: (
          <RequireAuth>
            <TicketFormPage />
          </RequireAuth>
        ),
      },
      {
        path: 'admin',
        element: (
          <RequireAuth>
            <AdminTicketsPage />
          </RequireAuth>
        ),
      },
      {
        path: 'ticket/:id',
        element: (
          <RequireAuth>
            <TicketPage />
          </RequireAuth>
        ),
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      // Maybe dashboard should be a child element of user?
      { path: 'user', element: <Navigate to="/user/dashboard" /> }, // Not sure if a good way to redirect
      {
        path: 'user/dashboard',
        element: (
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        ),
      },
      {
        path: 'user/settings',
        element: (
          <RequireAuth>
            <UserPageSettings />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;
