import React from 'react';
import { StatCard } from './components/StatCard';
import { Chart } from './components/Chart';
import { Users, FileText, FileSearch, UserCheck, UserX, Clock } from 'lucide-react';

 const AdminDashboard = () => {
  const jobCategoryData = [
    { label: 'Software Engineer', value: 24, color: 'bg-blue-500' },
    { label: 'Data Scientist', value: 18, color: 'bg-purple-500' },
    { label: 'Product Manager', value: 12, color: 'bg-green-500' },
    { label: 'UX Designer', value: 9, color: 'bg-yellow-500' },
    { label: 'DevOps Engineer', value: 15, color: 'bg-red-500' },
  ];

  const resumeMatchData = [
    { label: '90-100%', value: 12, color: 'bg-green-500' },
    { label: '70-89%', value: 28, color: 'bg-blue-500' },
    { label: '50-69%', value: 45, color: 'bg-yellow-500' },
    { label: '0-49%', value: 15, color: 'bg-red-500' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'added a new job description', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'updated user permissions', time: '3 hours ago' },
    { user: 'Mike Johnson', action: 'reviewed 5 resumes', time: '5 hours ago' },
    { user: 'Sarah Williams', action: 'added 3 new users', time: '1 day ago' },
    { user: 'David Brown', action: 'deleted a job description', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="156"
          icon={<Users className="text-white" size={24} />}
          color="bg-blue-500"
          change="12%"
          isPositive={true}
        />
        <StatCard
          title="Active Users"
          value="132"
          icon={<UserCheck className="text-white" size={24} />}
          color="bg-green-500"
          change="8%"
          isPositive={true}
        />
        <StatCard
          title="Job Descriptions"
          value="78"
          icon={<FileText className="text-white" size={24} />}
          color="bg-purple-500"
          change="15%"
          isPositive={true}
        />
        <StatCard
          title="Resume Matches"
          value="1,254"
          icon={<FileSearch className="text-white" size={24} />}
          color="bg-yellow-500"
          change="24%"
          isPositive={true}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Chart
          title="Job Descriptions by Category"
          data={jobCategoryData}
          type="bar"
        />
        <Chart
          title="Resume Match Distribution"
          data={resumeMatchData}
          type="pie"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  {activity.user.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user} <span className="font-normal text-gray-500">{activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock size={12} className="mr-1" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Status</h3>
          <div className="flex justify-center">
            <div className="relative h-48 w-48">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%)' }}></div>
                <div className="absolute inset-0 bg-red-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%, 50% 50%)' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full h-24 w-24"></div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-600">Active (85%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs text-gray-600">Inactive (15%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;