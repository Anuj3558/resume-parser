import React from 'react';
import { FileText } from 'lucide-react';

const RecentActivities = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start border-b border-gray-100 pb-3">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <FileText size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.category} • {activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
