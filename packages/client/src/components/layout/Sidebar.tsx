import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Ticket, Users, Building2, BookOpen, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tickets', href: '/tickets', icon: Ticket },
    { name: 'Organizations', href: '/organizations', icon: Building2 },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className={cn('flex flex-col h-full bg-white border-r border-gray-200', className)}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
        <h1 className="text-xl font-bold text-primary-600">NexSupport</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
                            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-500',
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <div className="ml-3 truncate">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          fullWidth
          leftIcon={<LogOut className="h-4 w-4" />}
          onClick={handleLogout}
          className="justify-start"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;