import { useState, useEffect } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { useAuth } from '../../../hooks/AuthProvider';
import { Ticket } from '../../../model/Ticket';
import TicketService from '../../../services/TicketService';
import UserPageTicket from './UserTicketItem';

/**
 * @returns A component that displays a list of tickets created by the user
 */
export default function UserPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [refresh, setRefresh] = useState(true);
  const [refreshDisabled, setRefreshDisabled] = useState(false);
  const { user } = useAuth();

  /*
   * Fetch user's tickets on component mount
   *
   */
  useEffect(() => {
    if (!refresh || !user) return;
    const getTickets = async () => {
      const data = await TicketService.getTicketsByAuthorId(user.id);
      setTickets(data);
      setRefresh(false);
    };
    getTickets();
  }, [refresh, user?.id]);

  /*
   * Refresh tickets list
   */
  const handleRefresh = () => {
    setRefresh(true);

    // Disable refresh button for 500ms, so that the user can't spam the button
    setRefreshDisabled(true);
    setTimeout(() => {
      setRefreshDisabled(false);
    }, 500);
  };

  return (
    <div className="flex h-full w-full flex-col justify-start gap-6">
      <div className="flex">
        <h2 className="flex-1 text-center text-lg font-medium">My tickets</h2>
        <div className="relative">
          <button
            id="refresh"
            type="button"
            onClick={handleRefresh}
            disabled={refreshDisabled}
            className="absolute right-0 top-0 bottom-0"
          >
            <HiRefresh
              size={26}
              className={`h-full text-blue-400 transition ease-in-out ${
                refreshDisabled ? 'animate-spin' : 'hover:scale-[115%]'
              } `}
            />
          </button>
        </div>
      </div>
      {/* Tickets list view  */}
      <div className="flex flex-col flex-wrap">
        {tickets.length === 0 ? (
          <h3 className="mt-16 text-center text-xl font-medium">
            You have not created any tickets yet.
          </h3>
        ) : (
          tickets.map((ticket) => (
            <UserPageTicket key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
}
