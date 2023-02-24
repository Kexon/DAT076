import { Button, Card, Label, Sidebar, TextInput } from 'flowbite-react';
import { useState } from 'react';
import {
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
  HiCog,
} from 'react-icons/hi';
import TicketFormPage from '../TicketFormPage';
import UserPageInfo from './UserPageInfo';
import UserPageSettings from './UserPageSettings';
import UserTickets from './UserTickets';

export default function UserPage() {
  const [activeTab, setActiveTab] = useState('info');

  const renderComponent = () => {
    switch (activeTab) {
      case 'info':
        return <UserPageInfo />;
      case 'tickets':
        return <UserTickets />;
      case 'settings':
        return <UserPageSettings />;
      case 'createticket':
        return <TicketFormPage />;
      default:
        return <UserPageInfo />;
    }
  };

  return (
    <div>
      <Card className="mt-20 p-4">
        <h1 className="pl-5 text-3xl font-semibold">Account panel</h1>
        <div className="flex gap-1">
          <div className="w-fit ">
            <Sidebar aria-label="Default sidebar example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="#"
                    icon={HiChartPie}
                    onClick={() => setActiveTab('info')}
                  >
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="#"
                    icon={HiInbox}
                    label="3"
                    onClick={() => setActiveTab('tickets')}
                  >
                    My tickets
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="#"
                    icon={HiShoppingBag}
                    onClick={() => setActiveTab('createticket')}
                  >
                    Create ticket
                  </Sidebar.Item>
                  <Sidebar.Item href="#" icon={HiUser}>
                    Users
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="#"
                    icon={HiCog}
                    onClick={() => setActiveTab('settings')}
                  >
                    Change Settings
                  </Sidebar.Item>
                  <Sidebar.Item href="#" icon={HiArrowSmRight}>
                    Sign out
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
          <div>
            <hr className="h-full w-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-1 flex-col gap-10 px-6">
            <div className="flex">{renderComponent()}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
