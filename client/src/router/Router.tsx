import { createBrowserRouter } from 'react-router-dom';
import AdminTicketsPage from '../pages/admin/tickets/AdminTicketsPage';
import ViewTicket from '../pages/admin/tickets/ViewTicket';
import TicketFormPage from '../pages/client/TicketFormPage';
import Home from '../pages/Home';
import Root from '../Root';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'createticket', element: <TicketFormPage /> },
      { path: 'admin', element: <AdminTicketsPage /> },
      { path: 'tickets/:id', element: <ViewTicket /> },
    ],
  },
]);

export default router;
