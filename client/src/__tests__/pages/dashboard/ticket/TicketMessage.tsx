import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketMessage from '../../../../pages/dashboard/ticket/TicketMessage';
import { MockMessage } from '../../../../utils/Mock';

test('Message should display.', () => {
  render(<TicketMessage message={MockMessage} />, { wrapper: BrowserRouter });
  // ^name$ will check for exact match
  const userElement = screen.getByText(/^testuser$/);
  const messageElement = screen.getByText(MockMessage.content);

  expect(userElement).toBeInTheDocument();
  expect(messageElement).toBeInTheDocument();
});
