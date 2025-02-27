import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ShortlistingOverview = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Shortlisting Overview</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Software Engineer</p>
            <div className="flex items-center mt-1">
              <CheckCircle size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-gray-500">15 shortlisted</span>
              <XCircle size={16} className="text-red-500 ml-3 mr-1" />
              <span className="text-sm text-gray-500">25 rejected</span>
            </div>
          </div>
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">37.5%</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4ade80"
                strokeWidth="3"
                strokeDasharray="37.5, 100"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Product Manager</p>
            <div className="flex items-center mt-1">
              <CheckCircle size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-gray-500">8 shortlisted</span>
              <XCircle size={16} className="text-red-500 ml-3 mr-1" />
              <span className="text-sm text-gray-500">12 rejected</span>
            </div>
          </div>
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">40%</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4ade80"
                strokeWidth="3"
                strokeDasharray="40, 100"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortlistingOverview;
