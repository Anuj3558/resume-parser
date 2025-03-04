import React from 'react';
import { LayoutDashboard, FileText, FileSearch, LogOut } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'userdashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'jobsdesc', label: 'Job Descriptions', icon: <FileText size={20} /> },
    { id: 'candidates', label: 'Candidates', icon: <FileSearch size={20} /> },
  ];

  return (
    <div className="bg-gray-600 text-white w-64 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center">
          <LayoutDashboard className="mr-2" /> User Dashboard 
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="px-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-3 rounded-lg text-left ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center text-gray-300 hover:text-white w-full">
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};