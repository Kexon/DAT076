import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserTicketItem from '../../../../pages/dashboard/user/UserTicketItem';
import { MockTicket } from '../../../../utils/Mock';

test('Display the ticket', () => {
  render(<UserTicketItem ticket={MockTicket} />, { wrapper: BrowserRouter });
  const { title } = MockTicket;

  const titleElement = screen.getByText(title);
  expect(titleElement).toBeInTheDocument();
});
