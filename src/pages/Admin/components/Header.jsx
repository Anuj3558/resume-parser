import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 w-64">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-1 rounded-full hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="ml-2 font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};