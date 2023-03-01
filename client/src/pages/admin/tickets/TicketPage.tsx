/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Ticket } from '../../../model/Ticket';
import { UserInfo } from '../../../model/User';
import ApiService from '../../../services/ApiService';
import UserService from '../../../services/UserService';
import TicketInformationItem from './TicketInformationItem';
import TicketUserItem from './TicketUserItem';

export default function TicketPage() {
  const [ticket, setTicket] = useState<Ticket>();
  const [ticketOwner, setTicketOwner] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // This gives null

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

  if (!loading && !ticket && !ticketOwner) return <div>Ticket not found.</div>;

  return (
    <div className="grid-cols-6 gap-4 md:grid">
      <TicketInformationItem ticket={ticket} />
      <TicketUserItem ticket={ticket} ticketOwner={ticketOwner} />
    </div>
  );
}
