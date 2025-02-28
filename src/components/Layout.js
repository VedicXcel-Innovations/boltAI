import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row bg-gray-300">
        <div className="hidden lg:block lg:w-1/6 xl:w-1/5 2xl:w-1/6">
          <SideMenu />
        </div>
        <div className="w-full lg:w-5/6 xl:w-4/5 2xl:w-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
