import { useEffect, useState } from 'react';
import Message from '../../../model/Message';
import MessageService from '../../../services/MessageService';
import TicketMessageItem from './TicketMessageItem';

interface Props {
  ticketId?: string;
}

export default function TicketMessagesContainer({ ticketId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (ticketId) {
      const getMessages = async () => {
        const response = await MessageService.getMessages(ticketId);
        setMessages(response);
      };
      getMessages();
    }
  }, [ticketId]);
  return (
    <div className="col-span-3 flex flex-col flex-wrap break-words">
      {messages.map((message) => {
        return <TicketMessageItem message={message} />;
      })}
    </div>
  );
}
