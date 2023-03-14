import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserItem from '../../../../../pages/dashboard/admin/users/UserItem';
import { MockUser } from '../../../../../utils/Mock';

test('UserItem should show up on screen', () => {
  render(<UserItem user={MockUser} />, { wrapper: BrowserRouter });
  // ^name$ will check for exact match
  const titleElement = screen.getByText(/^testuser$/);
  expect(titleElement).toBeInTheDocument();
});
