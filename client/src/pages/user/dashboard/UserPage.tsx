import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
  HiInbox,
  HiUser,
  HiArrowSmRight,
  HiCog,
  HiPencil,
} from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import { UserLevel } from '../../../model/User';
import AdminTicketsPage from '../../admin/tickets/AdminTicketsPage';
import TicketPage from '../../admin/tickets/TicketPage';
import TicketFormPage from '../TicketFormPage';
import UserPageInfo from './UserPageInfo';
import UserPageSettings from './UserPageSettings';
import UserTickets from './UserTickets';

export default function UserPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('tickets');
  const { user, logout } = useAuth();
  const isAdmin = user && user.level >= UserLevel.ADMIN;

  /*
   * This method will render the correct component based on the active tab.
   */
  const renderComponent = () => {
    switch (activeTab) {
      case 'info':
        return <UserPageInfo />;
      case 'settings':
        return <UserPageSettings />;
      case 'createticket':
        return <TicketFormPage />;
      case 'alltickets':
        return <AdminTicketsPage />;
      case 'tickets':
        return <UserTickets />;
      default:
        return <TicketPage />;
    }
  };

  /*
   * This effect will run once the location in the URL changes
   * and will update the active tab.
   */
  useEffect(() => {
    const activeTabPath = window.location.hash.replace('#', '');
    setActiveTab(activeTabPath);
  }, [location]);

  const handleSignOut = () => {
    logout();
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
                    href="#tickets"
                    icon={HiInbox}
                    className={activeTab === '' ? 'bg-blue-100' : ''}
                  >
                    My tickets
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="#createticket"
                    icon={HiPencil}
                    className={`text-lg font-semibold ${
                      activeTab === 'createticket' ? 'bg-blue-100' : ''
                    }`}
                  >
                    Create ticket
                  </Sidebar.Item>
                </Sidebar.ItemGroup>

                {isAdmin && (
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="#alltickets"
                      icon={HiUser}
                      label="Admin"
                      className={
                        activeTab === 'alltickets' ? 'bg-blue-100' : ''
                      }
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
                )}
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="#settings"
                    icon={HiCog}
                    className={activeTab === 'settings' ? 'bg-blue-100' : ''}
                  >
                    Settings
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="#"
                    icon={HiArrowSmRight}
                    onClick={handleSignOut}
                  >
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
