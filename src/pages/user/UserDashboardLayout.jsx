import React, { useState } from 'react';
import { Sidebar } from './compoenets/Sidebar';
import UserDashboard from './compoenets/UserDashboard';
import JobDescriptions from './compoenets/JobDescriptions';
import JobCategories from './compoenets/JobCategories';
import Candidates from './compoenets/Candidates';
import Analytics from './compoenets/Analytics';




function UserDashboardLayout() {
  const [activeTab, setActiveTab] = useState('userdashboard');

  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          {activeTab === 'userdashboard' && <UserDashboard />}
          {activeTab === 'jobsdesc' && <JobDescriptions />}
          {activeTab === 'jobcat' && <JobCategories />}
         
          {activeTab === 'candidates' && <Candidates />}
          {activeTab === 'analytics' && <Analytics />}
        </main>
      </div>
    </div>
  );
}

export default UserDashboardLayout;