import { Avatar, Badge } from 'flowbite-react';
import Message from '../../../model/Message';
import { UserLevel } from '../../../model/User';

interface Props {
  message: Message;
}

/**
 * This component is used to display a message in a ticket.
 * @param message The message to display
 * @returns A component that displays a message in a ticket.
 */
export default function TicketMessage({ message }: Props) {
  const time = new Date(message.timestamp);
  const { systemMessage } = message;
  return (
    <div className="flex flex-col gap-2 border-2 border-blue-50 p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <Avatar
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          rounded
        />
        <div
          className={`flex flex-1 items-center ${
            systemMessage ? 'gap-2' : 'gap-3'
          }`}
        >
          <h2 className="font-medium">{message.sender.username}</h2>
          {systemMessage ? (
            <p>{message.content}</p>
          ) : (
            message.sender.level >= UserLevel.ADMIN && <Badge>Admin</Badge>
          )}
        </div>
        <p className="text-xs">{`${time.toLocaleDateString()} ${time.toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          },
        )}`}</p>
      </div>
      {!systemMessage && (
        <p className="break-words text-sm">{message.content}</p>
      )}
    </div>
  );
}
