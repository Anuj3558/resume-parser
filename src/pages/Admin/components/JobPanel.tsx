import React from "react";
import { X } from "lucide-react";

const JobPanel = ({ job, onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <X size={24} />
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-700">
        <strong>Category:</strong> {job.category}
      </p>
      <p className="mt-2 text-sm text-gray-700">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="mt-2 text-sm text-gray-700">
        <strong>Description:</strong> {job.description}
      </p>
      <p className="mt-2 text-sm text-gray-700">
        <strong>Requirements:</strong> {job.requirements}
      </p>
      <p className="mt-2 text-sm text-gray-700">
        <strong>Resume Matches:</strong> {job.resumeMatches}
      </p>
      <p className="mt-2 text-sm text-gray-500 ">
        Created on: {new Date(job.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default JobPanel;
