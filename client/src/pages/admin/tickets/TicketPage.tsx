/* eslint-disable jsx-a11y/anchor-is-valid */

import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import { Ticket } from '../../../model/Ticket';
import { UserInfo, UserLevel } from '../../../model/User';
import ApiService from '../../../services/ApiService';
import UserService from '../../../services/UserService';
import TicketMessagesContainer from './TicketMessagesContainer';

import TicketUserItem from './TicketUserItem';

export default function TicketPage() {
  const [ticket, setTicket] = useState<Ticket>();
  const [ticketOwner, setTicketOwner] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Fetch the search params from the URL
  const id = searchParams.get('id'); // Get the id from the search params
  /* const { user } = useAuth(); */

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
    const getUser = async () => {
      if (ticket) {
        const data = await UserService.getUserById(ticket.authorId);
        setTicketOwner(data);
      }
    };
    getUser();
  }, [ticket?.id]);

  /*
   * THIS PIECE OF CODE IS FOR CLOSING/OPENING TICKET
   * HOWEVER REACT SAYS: RENDERED MORE HOOKS THAN DURING THE PREVIOUS RENDER
   * IDK HOW TO FIX IT
   */

  /*   if (loading || !ticket || !ticketOwner) return <div>Ticket not found.</div>;

  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(ticket.open);
  const onTicketButtonClick = () => {
    setIsTicketOpen((ticketStatus) => !ticketStatus);
    if (isTicketOpen) ApiService.closeTicket(ticket.id);
    else ApiService.openTicket(ticket.id);
  };

  const canEditTicket = () => {
    if (user) {
      if (user.level >= UserLevel.ADMIN) return true;
      if (user.id === ticket.authorId) return true;
    }
    return false;
  }; */

  return (
    <div className="flex flex-col">
      <TicketUserItem ticket={ticket} ticketOwner={ticketOwner} />
      <TicketMessagesContainer
        ticketId={ticket?.id}
        ticketTitle={ticket?.title}
      />
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
