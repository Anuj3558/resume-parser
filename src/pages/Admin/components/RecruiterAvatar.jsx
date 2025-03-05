import { useEffect, useState } from "react";

export const RecruiterAvatars = ({ job }) => {
    if (!job.assigned) return <></>
  
    return (
      <div className="flex -space-x-2">
        {job?.assigned.slice(0, 3).map((recruiter, index) => (
          <div key={index} className="relative group">
            <img
              src={`https://ui-avatars.com/api/?name=${recruiter.name}&background=random`} 
              alt={recruiter.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-md cursor-pointer"
            />
            <span className="absolute left-0 bottom-10 hidden bg-gray-900 text-white text-xs px-2 py-1 rounded-md group-hover:block">
              {recruiter.name}
            </span>
          </div>
        ))}
        {job?.assigned.length > 3 && (
          <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-sm rounded-full border-2 border-white">
            +{job?.assigned.length - 3}
          </div>
        )}
      </div>
    );
  };
  