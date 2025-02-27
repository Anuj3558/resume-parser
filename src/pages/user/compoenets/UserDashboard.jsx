import React from 'react';
import StatsCard from './StatsCard';
import RecentActivities from './RecentActivities';
import ShortlistingOverview from './ShortlistingOverview';
import { Briefcase, FileText, Users, CheckCircle, XCircle } from 'lucide-react';
const UserDashboard = () => {
  // Mock data
  const stats = [
    { title: 'Job Categories', value: 12, icon: <Briefcase size={24} />, color: 'bg-blue-500' },
    { title: 'Job Descriptions', value: 24, icon: <FileText size={24} />, color: 'bg-green-500' },
    { title: 'Candidates', value: 156, icon: <Users size={24} />, color: 'bg-purple-500' },
    { title: 'Shortlisted', value: 42, icon: <CheckCircle size={24} />, color: 'bg-yellow-500' },
  ];

  const recentActivities = [
    { id: 1, action: 'New job description uploaded', category: 'Software Engineer', time: '2 hours ago' },
    { id: 2, action: '5 new resumes processed', category: 'Product Manager', time: '4 hours ago' },
    { id: 3, action: 'New job category created', category: 'Data Scientist', time: '1 day ago' },
    { id: 4, action: '10 candidates shortlisted', category: 'UX Designer', time: '2 days ago' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities activities={recentActivities} />
        <ShortlistingOverview />
      </div>
    </div>
  );
};

export default UserDashboard;
