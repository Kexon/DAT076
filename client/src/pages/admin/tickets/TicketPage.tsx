/* eslint-disable jsx-a11y/anchor-is-valid */

import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import { Ticket } from '../../../model/Ticket';
import { UserLevel } from '../../../model/User';
import ApiService from '../../../services/ApiService';
import TicketMessagesContainer from './TicketMessagesContainer';
import TicketUserItem from './TicketUserItem';

export default function TicketPage() {
  const [ticket, setTicket] = useState<Ticket>();
  const [loading, setLoading] = useState(true);
  const [canEditTicket, setCanEditTicket] = useState(false);
  const [searchParams] = useSearchParams(); // Fetch the search params from the URL
  const id = searchParams.get('id'); // Get the id from the search params
  const { user } = useAuth();

  useEffect(() => {
    const getTicket = async () => {
      if (id) {
        const data = await ApiService.getTicket(id);
        setTicket(data);
        setLoading(false);
      }
    };

    getTicket();
  }, [id]);

  useEffect(() => {
    if (user && ticket) {
      if (user.level >= UserLevel.ADMIN) setCanEditTicket(true);
      if (user.id === ticket.owner.id) setCanEditTicket(true);
    }
  }, [user?.id, ticket?.id]);

  if (loading) return <Spinner />;
  if (!ticket) return <div>Ticket not found.</div>;
  if (!canEditTicket) return <div>Not authorized to view this ticket.</div>;
  /*
   * THIS PIECE OF CODE IS FOR CLOSING/OPENING TICKET
   * HOWEVER REACT SAYS: RENDERED MORE HOOKS THAN DURING THE PREVIOUS RENDER
   * IDK HOW TO FIX IT
   */
  /*
  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(ticket.open);
  const onTicketButtonClick = () => {
    setIsTicketOpen((ticketStatus) => !ticketStatus);
    if (isTicketOpen) ApiService.closeTicket(ticket.id);
    else ApiService.openTicket(ticket.id);
  };
  */

  return (
    <div className="flex flex-col">
      <TicketUserItem ticket={ticket} ticketOwner={ticket?.owner} />
      <TicketMessagesContainer ticketId={ticket?.id} />
      {/*       {!isTicketOpen ? (
        <Button
          color="success"
          className={!canEditTicket() ? 'hidden' : ''}
          size="xs"
          onClick={onTicketButtonClick}
        >
          Open ticket
        </Button>
      ) : (
        <Button
          className={!canEditTicket() ? 'hidden' : ''}
          color="failure"
          size="xs"
          onClick={onTicketButtonClick}
        >
          Close ticket
        </Button>
      )} */}
    </div>
  );
}
