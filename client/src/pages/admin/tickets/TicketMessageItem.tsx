import { Avatar, Card } from 'flowbite-react';
import Message from '../../../model/Message';
import { UserInfo } from '../../../model/User';

interface Props {
  message: Message;
}

export default function TicketMessageItem({ message }: Props) {
  const time = new Date(message.timestamp);
  return (
    <div className="flex flex-col gap-2 border-2 border-blue-50 p-4 shadow-lg">
      <div className="flex items-center gap-1">
        <Avatar
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          rounded
        />
        <h2 className="flex-1 font-medium">{message.sender}</h2>
        <p className="text-xs">{`${time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}, ${time.toLocaleDateString()}`}</p>
      </div>
      <p className="break-words text-sm">{message.content}</p>
    </div>
  );
}
