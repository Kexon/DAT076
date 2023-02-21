import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import UserPageSettings from './UserPageSettings';
import UserTickets from './UserTickets';

export default function UserPage() {
  return (
    <div>
      <Card className="text-3xl font-semibold">Greetings username</Card>
      <div className="flex flex-col sm:flex-row">
        <UserPageSettings />
        <UserTickets />
      </div>
    </div>
  );
}
