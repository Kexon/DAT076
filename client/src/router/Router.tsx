import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminTicketsPage from '../pages/admin/tickets/AdminTicketsPage';
import TicketPage from '../pages/admin/tickets/TicketPage';
import TicketFormPage from '../pages/user/TicketFormPage';
import Home from '../pages/Home';
import Root from '../Root';
import UserPage from '../pages/user/UserPage';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'createticket', element: <TicketFormPage /> },
      { path: 'admin', element: <AdminTicketsPage /> },
      { path: 'ticket/:id', element: <TicketPage /> },
      // Maybe dashboard should be a child element of user?
      { path: 'user', element: <Navigate to="/user/dashboard" /> }, // Not sure if a good way to redirect
      { path: 'user/dashboard', element: <UserPage /> },
    ],
  },
]);

export default router;
