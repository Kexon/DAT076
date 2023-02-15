import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Ticket from './model/Ticket';
import AdminTicketItem from './pages/admin/tickets/AdminTicketItem';

/*test('renders learn react link', () => {
  render(<Root />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

test('Ticket should show up on screen', () => {
  const newTicket: Ticket = {
    id: 1,
    title: 'Ticket',
    description: 'Ticket',
    open: true,
    authorId: 1,
  };
  render(<AdminTicketItem ticket={newTicket} />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/Ticket/i);
  expect(linkElement).toBeInTheDocument();
});
