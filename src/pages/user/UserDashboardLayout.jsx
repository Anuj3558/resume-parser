import React, { useState } from 'react';
import { Header } from './components/Header';
import AdminDashboard from './AdminDashboard';
import  UserManagement  from './UserManagement';

import { Sidebar } from './components/Sidebar';
import ResumeMatching from './ResumeMatching';
import { JobDescriptions } from './components/JobDescriptions';



function UserDashboardLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          {activeTab === 'userdashboard' && <AdminDashboard />}
          {activeTab === 'jobsdesc' && <UserManagement />}
          {activeTab === 'jobcat' && <JobDescriptions />}
          {activeTab === 'candidates' && <ResumeMatching />}
          {activeTab === 'analytics' && <ResumeMatching />}
        </main>
      </div>
    </div>
  );
}

export default UserDashboardLayout;