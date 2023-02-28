import { useState, useEffect } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { useAuth } from '../../../hooks/AuthProvider';
import { Ticket } from '../../../model/Ticket';
import ApiService from '../../../services/ApiService';
import UserPageTicket from './UserTicketItem';

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
      const data = await ApiService.getTicketsByAuthorId(user.id);
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
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">My tickets</h2>
        <button
          id="refresh"
          type="button"
          onClick={handleRefresh}
          disabled={refreshDisabled}
        >
          <HiRefresh
            size={26}
            className={`h-full text-blue-400 transition ease-in-out ${
              refreshDisabled ? 'animate-spin' : 'hover:scale-[115%]'
            } `}
          />
        </button>
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
