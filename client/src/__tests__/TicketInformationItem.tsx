import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketInformationItem from '../pages/ticket/TicketInformationItem';
import MockTicket from '../utils/Mock';

test('the title and description should be displayed', () => {
  render(<TicketInformationItem ticket={MockTicket} />, {
    wrapper: BrowserRouter,
  });
  const titleElement = screen.getByText(/^Test Ticket$/);
  const descElement = screen.getByText(/^This is a test ticket$/);
  expect(titleElement).toBeInTheDocument();
  expect(descElement).toBeInTheDocument();
});
