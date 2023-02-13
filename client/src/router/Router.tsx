import { createBrowserRouter } from 'react-router-dom';
import AdminTicketsPage from '../pages/admin/tickets/AdminTicketsPage';
import TicketFormPage from '../pages/client/TicketFormPage';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'createticket',
    element: <TicketFormPage />,
  },
  {
    path: 'admin',
    element: <AdminTicketsPage />,
  },
]);

export default router;
