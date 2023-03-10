import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketHeader from '../pages/dashboard/ticket/TicketHeader';
import { MockTicket } from '../utils/Mock';

test('the title and description should be displayed', () => {
  render(<TicketHeader ticket={MockTicket} />, {
    wrapper: BrowserRouter,
  });
  const titleElement = screen.getByText(/^Test Ticket$/);
  const descElement = screen.getByText(/^This is a test ticket$/);
  expect(titleElement).toBeInTheDocument();
  expect(descElement).toBeInTheDocument();
});
