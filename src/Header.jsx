import React from 'react';
import { Bell, Users } from 'lucide-react';

const FixedHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Sales Overview */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Sales Overview</h1>
            <p className="text-sm text-gray-500">Monitor sales performance and metrics</p>
          </div>
        </div>

        {/* Right Section - Notifications and User */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">admin@mbg.c...</p>
              <p className="text-xs text-gray-500">SUPERADMIN</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FixedHeader;