import { Badge, Button, Card, Label, Sidebar, TextInput } from 'flowbite-react';
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
    <div className="mt-32 flex">
      <div className="flex flex-col">
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
                  <Sidebar.Item
                    href="#"
                    icon={HiUser}
                    label="Admin"
                    className="accent-slate-500"
                  >
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
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-10 rounded-lg px-6 pb-6 pt-2 shadow-md">
        <div className="flex">{renderComponent()}</div>
      </div>
    </div>
  );
}
