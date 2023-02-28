import { Sidebar } from 'flowbite-react';
import { useState } from 'react';
import {
  HiInbox,
  HiUser,
  HiArrowSmRight,
  HiCog,
  HiPencil,
  HiHome,
} from 'react-icons/hi';
import AdminTicketsPage from '../../admin/tickets/AdminTicketsPage';
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
      case 'alltickets':
        return <AdminTicketsPage />;
      default:
        return <UserPageInfo />;
    }
  };

  return (
    <div className="mt-32 flex">
      <div className="hidden flex-col md:flex">
        <h1 className="pl-5 text-3xl font-semibold">Account panel</h1>
        <div className="flex gap-1">
          <div className="w-fit ">
            <Sidebar aria-label="Default sidebar example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="#info"
                    icon={HiHome}
                    onClick={() => setActiveTab('info')}
                    className={activeTab === 'info' ? 'bg-blue-100' : ''}
                  >
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="#createticket"
                    icon={HiPencil}
                    onClick={() => setActiveTab('createticket')}
                    className={`text-lg font-semibold ${
                      activeTab === 'createticket' ? 'bg-blue-100' : ''
                    }`}
                  >
                    Create ticket
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="#tickets"
                    icon={HiInbox}
                    onClick={() => setActiveTab('tickets')}
                    className={activeTab === 'tickets' ? 'bg-blue-100' : ''}
                  >
                    My tickets
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="#"
                    icon={HiUser}
                    label="Admin"
                    className={activeTab === 'alltickets' ? 'bg-blue-100' : ''}
                    onClick={() => setActiveTab('alltickets')}
                  >
                    All tickets
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="#"
                    icon={HiUser}
                    label="Admin"
                    className="label"
                  >
                    Users
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="#"
                    icon={HiCog}
                    onClick={() => setActiveTab('settings')}
                    className={activeTab === 'settings' ? 'bg-blue-100' : ''}
                  >
                    Settings
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
      <div className="">
        <hr className="mt-4 h-[360px] w-px bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="flex flex-1 flex-col gap-10 rounded-lg px-6 pb-6 pt-2 ">
        <div className="flex">{renderComponent()}</div>
      </div>
    </div>
  );
}
