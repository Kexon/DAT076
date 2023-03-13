import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import TicketHeader from '../pages/dashboard/ticket/TicketHeader';
import { MockTicket } from '../utils/Mock';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container === null) return;
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

/* When writing UI tests, tasks like rendering, user events, or data fetching
 * can be considered as “units” of interaction with a user interface.
 *
 * react-dom/test-utils provides a helper called act() that makes sure all updates related to
 * these “units” have been processed and applied to the DOM before you make any assertions: */
test('the title and description should be displayed', () => {
  act(() => {
    render(<TicketHeader ticket={MockTicket} />, {
      wrapper: BrowserRouter,
    });
  });

  const { id } = MockTicket;
  const { title } = MockTicket;
  const idElement = screen.getByText(`#${id}`);
  const titleElement = screen.getByText(title);
  expect(titleElement).toBeInTheDocument();
  expect(idElement).toBeInTheDocument();
});
