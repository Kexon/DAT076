import { Spinner } from 'flowbite-react';
import Message from '../../model/Message';

import TicketMessage from './TicketMessage';

interface Props {
  messages?: Message[];
}

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
