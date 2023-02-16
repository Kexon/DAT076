import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

test('The buttons on the home page should appear on screen', () => {
  render(<Home />, { wrapper: BrowserRouter });
  const createButton = screen.getByText(/Create ticket/i);
  const viewButton = screen.getByText(/View all tickets/i);
  expect(createButton).toBeInTheDocument();
  expect(viewButton).toBeInTheDocument();
});
