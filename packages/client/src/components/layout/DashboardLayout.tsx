import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileSidebar from './MobileSidebar';

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };
  
  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <Sidebar className="hidden md:block md:w-64 md:flex-shrink-0" />
      
      {/* Mobile sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={handleCloseMobileMenu} />
      
      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onOpenMobileMenu={handleOpenMobileMenu} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;