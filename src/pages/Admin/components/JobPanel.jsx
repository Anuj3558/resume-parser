import React from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
const JobPanel = ({ job, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-1/2 h-fit min-h-[20rem] max-h-[75%] bg-neutral-100 border border-slate-800 rounded-xl shadow-lg  z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 shadow-lg">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <button onClick={onClose} className="text-gray-900 hover:text-black">
          <X size={24} />
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-900">
        <strong>Category:</strong> <ReactMarkdown>{job.category}</ReactMarkdown>
      </p>
      <p className="mt-2 text-sm text-gray-900">
        <strong>Location:</strong>  <ReactMarkdown>{job.location}</ReactMarkdown>
      </p>
      <p className="mt-2 text-sm text-gray-900">
        <strong>Description:</strong> <ReactMarkdown>{job.description}</ReactMarkdown>
      </p>
      <p className="mt-2 text-sm text-gray-900">
        <strong>Requirements:</strong> <ReactMarkdown>{job.requirements}</ReactMarkdown>
      </p>
      <p className="mt-2 text-sm text-gray-900">
        <strong>Resume Matches:</strong> <ReactMarkdown>{job.resumeMatches}</ReactMarkdown>
      </p>
      <p className="mt-2 text-sm text-gray-900 ">
        Created on: {new Date(job.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default JobPanel;
