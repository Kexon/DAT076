import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import UserPageSettings from './UserPageSettings';
import UserTickets from './UserTickets';

export default function UserPage() {
  return (
    <div>
      <Card className="mt-20 p-4">
        <div className="flex flex-col gap-10">
          <h1 className="text-3xl font-semibold">Greetings username</h1>
          <div className="flex flex-col gap-20 sm:flex-row">
            <UserPageSettings />
            <UserTickets />
          </div>
        </div>
      </Card>
    </div>
  );
}
