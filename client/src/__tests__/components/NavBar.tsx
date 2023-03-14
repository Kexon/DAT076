import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/NavBar';

test('the tickino button should navigate the user to the homepage', () => {
  render(<NavBar />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/tickino/i);
  expect(linkElement.closest('a')?.href).toEqual('http://localhost/');
});
