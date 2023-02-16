import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketFormPage from '../pages/client/TicketFormPage';

// Mock jest and set the type
/* jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Ticket should be created', async () => {
  render(<TicketFormPage />, { wrapper: BrowserRouter });
  // Write something in the title and description form in Ticketformpage
  // Provide the data object to be returned
  mockedAxios.post.mockResolvedValue(MockTicket);
  const titleInput = screen.getByLabelText(/Title/i);
  const descriptionInput = screen.getByLabelText(/Description/i);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(titleInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(titleInput, { target: { value: 'Test Ticket' } });
  fireEvent.change(descriptionInput, {
    target: { value: 'This is a test ticket' },
  });
  fireEvent.click(submitButton);

  // Wait for the ticket to be created
  await waitFor(() => {
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    // how do we check if the ticket is created? can't seem to get the url from useparams
  });
}); */

test('submit button should be disabled when title & description is not filled in', async () => {
  render(<TicketFormPage />, { wrapper: BrowserRouter });
  expect(screen.getByText(/Submit/i).closest('button')).toBeDisabled();
});

test('submit button should be enabled when title & description is filled in', async () => {
  render(<TicketFormPage />, { wrapper: BrowserRouter });
  const titleInput = screen.getByLabelText(/Title/i);
  const descriptionInput = screen.getByLabelText(/Description/i);
  fireEvent.change(titleInput, { target: { value: 'Test Ticket' } });
  fireEvent.change(descriptionInput, {
    target: { value: 'This is a test ticket' },
  });
  expect(screen.getByText(/Submit/i).closest('button')).toBeEnabled();
});

test('submit button should be disabled when title is not filled in', async () => {
  render(<TicketFormPage />, { wrapper: BrowserRouter });
  const descriptionInput = screen.getByLabelText(/Description/i);
  fireEvent.change(descriptionInput, {
    target: { value: 'This is a test ticket' },
  });
  expect(screen.getByText(/Submit/i).closest('button')).toBeDisabled();
});

test('submit button should be disabled when description is not filled in', async () => {
  render(<TicketFormPage />, { wrapper: BrowserRouter });
  const titleInput = screen.getByLabelText(/Title/i);
  fireEvent.change(titleInput, { target: { value: 'Test Ticket' } });
  expect(screen.getByText(/Submit/i).closest('button')).toBeDisabled();
});
