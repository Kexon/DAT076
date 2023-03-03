/* eslint-disable jsx-a11y/anchor-is-valid */

import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Chatbox from '../../../components/Chatbox';
import { useAuth } from '../../../hooks/AuthProvider';
import Message from '../../../model/Message';
import { Ticket } from '../../../model/Ticket';
import { UserLevel } from '../../../model/User';
import ApiService from '../../../services/ApiService';
import MessageService from '../../../services/MessageService';
import TicketMessagesContainer from './TicketMessagesContainer';
import TicketUserItem from './TicketUserItem';

export default function TicketPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(false);
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
        if (data) setIsTicketOpen(data.open);
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

  useEffect(() => {
    if (ticket?.id) {
      const getMessages = async () => {
        const response = await MessageService.getMessages(ticket.id);
        setMessages(response);
      };
      getMessages();
    }
  }, [ticket?.id, isTicketOpen]);

  if (loading) return <Spinner />;
  if (!ticket) return <div>Ticket not found.</div>;
  if (!canEditTicket) return <div>Not authorized to view this ticket.</div>;

  const onTicketButtonClick = async () => {
    if (isTicketOpen) await ApiService.closeTicket(ticket.id);
    else await ApiService.openTicket(ticket.id);
    setIsTicketOpen((ticketStatus) => !ticketStatus);
  };

  const handleOnSubmit = async (content: string) => {
    const response = await MessageService.sendMessage(ticket.id, content);
    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className="flex flex-col gap-2">
      <TicketUserItem ticket={ticket} isTicketOpen={isTicketOpen} />
      <TicketMessagesContainer messages={messages} />
      <Chatbox
        onSubmit={handleOnSubmit}
        onTicketClick={onTicketButtonClick}
        canEditTicket={canEditTicket}
        ticketStatus={isTicketOpen}
      />
    </div>
  );
}
