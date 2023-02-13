import './App.css';
import TicketListPage from './pages/admin/tickets/AdminTicketsPage';
import TicketFormPage from './pages/client/TicketFormPage';

function App() {
  /*
   * The container class sets the max-width of an element to match the min-width of
   * the current breakpoint. This is useful if you’d prefer to design for a
   * fixed set of screen sizes instead of trying to accommodate a fully fluid viewport.
   */
  return (
    <div>
      <TicketFormPage />
      <TicketListPage />
    </div>
  );
}

export default App;
