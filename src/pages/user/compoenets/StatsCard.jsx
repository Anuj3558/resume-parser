import React from 'react';
import { Briefcase, FileText, Users, CheckCircle } from 'lucide-react';

const StatsCard = ({ stat }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
          {stat.icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{stat.title}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
