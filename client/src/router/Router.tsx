import { createBrowserRouter } from 'react-router-dom';
import AdminTicketsPage from '../pages/admin/tickets/AdminTicketsPage';
import TicketPage from '../pages/admin/tickets/TicketPage';
import TicketFormPage from '../pages/user/TicketFormPage';
import Home from '../pages/Home';
import Root from '../Root';
import RequireAuth from '../RequireAuth';
import LoginPage from '../pages/LoginPage';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
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
    ],
  },
]);

export default router;
