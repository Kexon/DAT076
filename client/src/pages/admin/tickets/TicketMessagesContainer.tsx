import { Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Message from '../../../model/Message';
import MessageService from '../../../services/MessageService';
import Chatbox from './Chatbox';
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

  const handleOnSubmit = async (content: string) => {
    if (ticketId) {
      const response = await MessageService.sendMessage(ticketId, content);
      setMessages((prev) => [...prev, response]);
    }
  };

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
      <div className="flex flex-col gap-2">
        {messages.map((message) => {
          return <TicketMessageItem key={message.id} message={message} />;
        })}
      </div>
      <Chatbox onSubmit={handleOnSubmit} />
    </div>
  );
}
