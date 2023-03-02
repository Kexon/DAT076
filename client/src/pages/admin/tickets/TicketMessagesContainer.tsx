import { Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Message from '../../../model/Message';
import MessageService from '../../../services/MessageService';
import TicketMessageItem from './TicketMessageItem';

interface Props {
  ticketId?: string;
  ticketTitle?: string;
}

export default function TicketMessagesContainer({
  ticketId,
  ticketTitle,
}: Props) {
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
    <div className="col-span-3 flex flex-col">
      <h1 className="p-2 text-xl font-semibold">{ticketTitle}</h1>
      <div className="flex flex-col gap-2">
        {messages.map((message) => {
          return <TicketMessageItem message={message} />;
        })}
      </div>
    </div>
  );
}
