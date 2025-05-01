import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

const Header = ({ onOpenMobileMenu }: HeaderProps) => {
  const { user } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              onClick={onOpenMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-1 items-center px-4">
            <div className="relative max-w-md w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-primary-500 focus:text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Search"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-full p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            
            {/* User dropdown */}
            <div className="relative ml-4">
              <div>
                <button
                  type="button"
                  className="flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  id="user-menu-button"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>
              </div>
              
              {showUserMenu && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setShowUserMenu(false);
                      useAuthStore.getState().logout();
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;