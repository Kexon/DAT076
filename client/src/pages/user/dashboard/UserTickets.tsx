import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { Ticket } from '../../../model/Ticket';
import ApiService from '../../../services/ApiService';
import UserPageTicket from './UserTicketItem';

export default function UserPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [refresh, setRefresh] = useState(true);
  const [refreshDisabled, setRefreshDisabled] = useState(false);
  useEffect(() => {
    if (!refresh) return;
    const getTickets = async () => {
      const data = await ApiService.getTickets();
      setTickets(data);
      setRefresh(false);
    };
    getTickets();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(true);
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
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-lg font-medium">No tickets found</h3>
          </div>
        ) : (
          tickets.map((ticket) => (
            <UserPageTicket key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
}
