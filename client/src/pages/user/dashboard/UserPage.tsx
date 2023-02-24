import { Button, Card, Label, TextInput } from 'flowbite-react';
import UserPageInfo from './UserPageInfo';
import UserTickets from './UserTickets';

export default function UserPage() {
  return (
    <div>
      <Card className="mt-20 p-4">
        <div className="flex flex-col gap-10">
          <h1 className="text-3xl font-semibold">Account panel</h1>
          <div className="flex flex-col gap-20 sm:flex-row">
            <UserPageInfo />
            <div>
              <hr className="h-full w-px bg-gray-200 dark:bg-gray-700" />
            </div>
            <UserTickets />
          </div>
        </div>
      </Card>
    </div>
  );
}
