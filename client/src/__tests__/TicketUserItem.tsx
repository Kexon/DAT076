import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketUserItem from '../pages/admin/tickets/TicketUserItem';
import { MockTicket } from '../utils/Mock';

test('the id should be displayed', () => {
  render(<TicketUserItem ticket={MockTicket} />, { wrapper: BrowserRouter });
  const idElement = screen.getByText(/^#1$/);
  expect(idElement).toBeInTheDocument();
});

test('component should be displaying loading when ticket is undefined', () => {
  render(<TicketUserItem />, { wrapper: BrowserRouter });
  const idElement = screen.getByText(/^Loading...$/);
  expect(idElement).toBeInTheDocument();
});
