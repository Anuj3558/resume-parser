import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatCard } from './components/StatCard';
import { Chart } from './components/Chart';
import { Users, FileText, FileSearch, UserCheck, UserX, Clock } from 'lucide-react';





const AdminDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  // Fetch analytics data from the backend
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/analytics`);
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);
  const getRandomColor = () => {
    const colors = ['blue', 'purple', 'green', 'yellow', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  // Format job category data for the chart
  const jobCategoryData =
    analyticsData?.jobCategories.map((category) => ({
      label: category._id,
      value: category?.count,
      color: `bg-${getRandomColor()}-500`, // Random color for each category
    })) || [];

  // Format resume match distribution data for the chart
  const resumeMatchData=
    analyticsData?.resumeMatchDistribution.map((match) => ({
      label: match._id,
      value: match.count,
      color: `bg-${getRandomColor()}-500`, // Random color for each range
    })) || [];

  // Helper function to generate random colors
 

  if (!analyticsData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={analyticsData.totalUsers.toString()}
          icon={<Users className="text-white" size={24} />}
          color="bg-blue-500"
          change="12%"
          isPositive={true}
        />
        <StatCard
          title="Active Users"
          value={analyticsData.activeUsers.toString()}
          icon={<UserCheck className="text-white" size={24} />}
          color="bg-green-500"
          change="8%"
          isPositive={true}
        />
        <StatCard
          title="Job Descriptions"
          value={analyticsData.totalJobs.toString()}
          icon={<FileText className="text-white" size={24} />}
          color="bg-purple-500"
          change="15%"
          isPositive={true}
        />
        <StatCard
          title="Resume Matches"
          value={analyticsData.totalResumeMatches.toString()}
          icon={<FileSearch className="text-white" size={24} />}
          color="bg-yellow-500"
          change="24%"
          isPositive={true}
        />
      </div>

      {/* Charts */}
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

      {/* Recent Activity and User Status */}
      
    </div>
  );
};

export default AdminDashboard;