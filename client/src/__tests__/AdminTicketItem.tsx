import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminTicketItem from '../pages/admin/tickets/AdminTicketItem';
import MockTicket from '../utils/MockTicket';

test('Ticket should show up on screen', () => {
  render(<AdminTicketItem ticket={MockTicket} />, { wrapper: BrowserRouter });
  // ^name$ will check for exact match
  const titleElement = screen.getByText(/^Test Ticket$/);
  expect(titleElement).toBeInTheDocument();
});
