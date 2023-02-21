import { Card } from 'flowbite-react';
import UserPageTickets from './UserTickets';

export default function UserPage() {
  return (
    <div>
      <Card className="text-3xl font-semibold">Greetings username</Card>
      <div className="flex flex-col sm:flex-row">
        <Card className="sm:flex-1">Account Settings</Card>
        <UserPageTickets />
      </div>
    </div>
  );
}
