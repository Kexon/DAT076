import { Card } from 'flowbite-react';
import UserTickets from './UserTickets';

export default function UserPage() {
  return (
    <div>
      <Card className="text-3xl font-semibold">Greetings username</Card>
      <div className="flex flex-col sm:flex-row">
        <Card className="sm:flex-1">
          <h2 className="text-lg font-medium">Account</h2>
        </Card>
        <UserTickets />
      </div>
    </div>
  );
}
