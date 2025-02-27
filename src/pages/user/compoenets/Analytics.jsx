import React from 'react';
import { BarChart2, PieChart, TrendingUp, Users, CheckCircle, XCircle } from 'lucide-react';

const Analytics = () => {
  // Mock data
  const jobCategories = [
    { name: 'Software Engineering', shortlisted: 35, rejected: 65 },
    { name: 'Product Management', shortlisted: 42, rejected: 58 },
    { name: 'Data Science', shortlisted: 28, rejected: 72 },
    { name: 'UX Design', shortlisted: 45, rejected: 55 },
  ];

  const monthlyApplications = [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 68 },
    { month: 'Apr', count: 75 },
    { month: 'May', count: 82 },
    { month: 'Jun', count: 90 },
  ];

  const topSkills = [
    { skill: 'React', count: 78 },
    { skill: 'JavaScript', count: 92 },
    { skill: 'TypeScript', count: 65 },
    { skill: 'Node.js', count: 58 },
    { skill: 'Python', count: 72 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg text-white mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Candidates</p>
              <p className="text-2xl font-bold">1,245</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">12% increase this month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg text-white mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Shortlisted</p>
              <p className="text-2xl font-bold">386</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">8% increase this month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-lg text-white mr-4">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Rejected</p>
              <p className="text-2xl font-bold">859</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-red-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">15% increase this month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg text-white mr-4">
              <BarChart2 size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg. Matching Score</p>
              <p className="text-2xl font-bold">72%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">3% increase this month</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Applications Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Monthly Applications</h2>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <BarChart2 size={20} className="text-indigo-600" />
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {monthlyApplications.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition-all"
                  style={{ height: `${(item.count / 100) * 100}%` }}
                ></div>
                <div className="text-xs mt-2 text-gray-600">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Skills */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Top Skills in Demand</h2>
            <div className="bg-green-100 p-2 rounded-lg">
              <PieChart size={20} className="text-green-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {topSkills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                  <span className="text-sm text-gray-500">{skill.count} candidates</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${(skill.count / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Job Categories Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Job Categories Performance</h2>
          <div className="bg-blue-100 p-2 rounded-lg">
            <BarChart2 size={20} className="text-blue-600" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shortlisted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rejected
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobCategories.map((category, index) => {
                const total = category.shortlisted + category.rejected;
                const successRate = Math.round((category.shortlisted / total) * 100);
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{category.shortlisted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{category.rejected}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                          <div 
                            className={`h-2.5 rounded-full ${
                              successRate >= 40 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${successRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">{successRate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;