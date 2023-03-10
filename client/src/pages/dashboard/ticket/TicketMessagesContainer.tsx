import { Spinner } from 'flowbite-react';
import Message from '../../../model/Message';

import TicketMessage from './TicketMessage';

interface Props {
  messages?: Message[];
}

/**
 * This component is used to display all messages in a ticket.
 * @param messages The messages to display
 * @returns A component that displays all messages in a ticket.
 * @see TicketMessage
 */
export default function TicketMessagesContainer({ messages }: Props) {
  return (
    <div className="col-span-3 flex flex-col">
      <div className="flex flex-col gap-2">
        {messages ? (
          messages.map((message) => {
            return <TicketMessage key={message.id} message={message} />;
          })
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
