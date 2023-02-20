import { createBrowserRouter } from 'react-router-dom';
import AdminTicketsPage from '../pages/admin/tickets/AdminTicketsPage';
import TicketPage from '../pages/admin/tickets/TicketPage';
import TicketFormPage from '../pages/user/TicketFormPage';
import Home from '../pages/Home';
import Root from '../Root';
import LoginPage from '../pages/LoginPage';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'createticket', element: <TicketFormPage /> },
      { path: 'admin', element: <AdminTicketsPage /> },
      { path: 'ticket/:id', element: <TicketPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);

export default router;
