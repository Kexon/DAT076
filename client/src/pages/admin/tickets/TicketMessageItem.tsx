import { Card } from 'flowbite-react';
import Message from '../../../model/Message';
import { UserInfo } from '../../../model/User';

interface Props {
  message: Message;
}

export default function TicketMessageItem({ message }: Props) {
  return (
    <Card className="w-full break-words">{`${message.sender}: ${message.content}`}</Card>
  );
}
