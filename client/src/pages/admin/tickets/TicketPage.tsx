/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket } from '../../../model/Ticket';
import ApiService from '../../../services/ApiService';
import TicketInformationItem from './TicketInformationItem';
import TicketUserItem from './TicketUserItem';

export default function TicketPage() {
  const [ticket, setTicket] = useState<Ticket>();
  const { id } = useParams();
  useEffect(() => {
    const getTicket = async () => {
      if (id) {
        const data = await ApiService.getTicket(parseInt(id, 10));
        setTicket(data);
      }
    };
    getTicket();
  }, [id]);
  return (
    <div className="grid-cols-6 gap-4 md:grid">
      <TicketInformationItem ticket={ticket} />
      <TicketUserItem ticket={ticket} />
    </div>
  );
}