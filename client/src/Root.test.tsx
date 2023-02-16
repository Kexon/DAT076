import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Ticket } from './model/Ticket';
import AdminTicketItem from './pages/admin/tickets/AdminTicketItem';
import TicketFormPage from './pages/client/TicketFormPage';

/*test('renders learn react link', () => {
  render(<Root />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

test('Ticket should show up on screen', () => {
  const newTicket: Ticket = {
    id: 1,
    title: 'Ticket',
    description: 'ticket description',
    open: true,
    authorId: 1,
  };
  render(<AdminTicketItem ticket={newTicket} />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/Ticket/i);
  expect(linkElement).toBeInTheDocument();
});

test('Ticket should be created', async () => {
  render(<TicketFormPage />, { wrapper: BrowserRouter });
  // Write something in the title and description form in Ticketformpage
  const titleInput = screen.getByLabelText(/Title/i);
  const descriptionInput = screen.getByLabelText(/Description/i);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(titleInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(titleInput, { target: { value: 'New ticket' } });
  fireEvent.change(descriptionInput, { target: { value: 'ticket desc' } });
  fireEvent.click(submitButton);

  // Wait for the ticket to be created
  await waitFor(() => {
    // Expect that the ticket details are displayed on the page
    const ticketTitle = screen.getByText('New ticket');
    const ticketDescription = screen.getByText('ticket desc');
    expect(ticketTitle).toBeInTheDocument();
    expect(ticketDescription).toBeInTheDocument();
  });
});
