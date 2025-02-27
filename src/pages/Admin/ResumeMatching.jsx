import React, { useState } from 'react';

import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ResumeTable from './components/ResumeTable';
import  Modal  from './components/Modal';

const ResumeMatching = () => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      candidateName: 'Alex Johnson',
      candidateEmail: 'alex.johnson@example.com',
      jobTitle: 'Senior Frontend Developer',
      jobCategory: 'Software Engineer',
      matchPercentage: 92,
      submittedDate: '2023-06-15',
    },
    {
      id: 2,
      candidateName: 'Emily Chen',
      candidateEmail: 'emily.chen@example.com',
      jobTitle: 'Data Scientist',
      jobCategory: 'Data Scientist',
      matchPercentage: 88,
      submittedDate: '2023-06-16',
    },
    {
      id: 3,
      candidateName: 'Michael Brown',
      candidateEmail: 'michael.brown@example.com',
      jobTitle: 'Product Manager',
      jobCategory: 'Product Manager',
      matchPercentage: 75,
      submittedDate: '2023-06-17',
    },
    {
      id: 4,
      candidateName: 'Sophia Lee',
      candidateEmail: 'sophia.lee@example.com',
      jobTitle: 'UX/UI Designer',
      jobCategory: 'UX Designer',
      matchPercentage: 82,
      submittedDate: '2023-06-18',
    },
    {
      id: 5,
      candidateName: 'James Wilson',
      candidateEmail: 'james.wilson@example.com',
      jobTitle: 'DevOps Engineer',
      jobCategory: 'DevOps Engineer',
      matchPercentage: 68,
      submittedDate: '2023-06-19',
    },
    {
      id: 6,
      candidateName: 'Olivia Martinez',
      candidateEmail: 'olivia.martinez@example.com',
      jobTitle: 'Senior Frontend Developer',
      jobCategory: 'Software Engineer',
      matchPercentage: 79,
      submittedDate: '2023-06-20',
    },
    {
      id: 7,
      candidateName: 'William Taylor',
      candidateEmail: 'william.taylor@example.com',
      jobTitle: 'Data Scientist',
      jobCategory: 'Data Scientist',
      matchPercentage: 65,
      submittedDate: '2023-06-21',
    },
    {
      id: 8,
      candidateName: 'Emma Davis',
      candidateEmail: 'emma.davis@example.com',
      jobTitle: 'Product Manager',
      jobCategory: 'Product Manager',
      matchPercentage: 91,
      submittedDate: '2023-06-22',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResume, setCurrentResume] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [matchFilter, setMatchFilter] = useState('All');

  const handleViewResume = (resume) => {
    setCurrentResume(resume);
    setIsModalOpen(true);
  };

  const categories = ['All', 'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer'];
  const matchRanges = ['All', '90-100%', '80-89%', '70-79%', '60-69%', 'Below 60%'];

  const getMatchRange = (percentage) => {
    if (percentage >= 90) return '90-100%';
    if (percentage >= 80) return '80-89%';
    if (percentage >= 70) return '70-79%';
    if (percentage >= 60) return '60-69%';
    return 'Below 60%';
  };

  const filteredResumes = resumes.filter(
    (resume) =>
      (categoryFilter === 'All' || resume.jobCategory === categoryFilter) &&
      (matchFilter === 'All' || getMatchRange(resume.matchPercentage) === matchFilter) &&
      (resume.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Resume Matching</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center rounded-md bg-white px-4 py-2 shadow-sm w-full md:w-96">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search resumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-full text-sm"
          />
        </div>

        <div className="flex items-center rounded-md bg-white px-4 py-2 shadow-sm">
          <Filter size={18} className="text-gray-500 mr-2" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border-none outline-none text-sm bg-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center rounded-md bg-white px-4 py-2 shadow-sm">
          <SlidersHorizontal size={18} className="text-gray-500 mr-2" />
          <select
            value={matchFilter}
            onChange={(e) => setMatchFilter(e.target.value)}
            className="border-none outline-none text-sm bg-transparent"
          >
            {matchRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Resume Matches</h2>
          <p className="mt-1 text-sm text-gray-500">
            View and analyze resume matches with job descriptions
          </p>
        </div>
        <ResumeTable resumes={filteredResumes} onView={handleViewResume} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Resume Details"
      >
        {currentResume && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{currentResume.candidateName}</h3>
              <p className="text-sm text-gray-500">{currentResume.candidateEmail}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Match Score:</span>
                <span className="text-sm font-medium text-gray-900">{currentResume.matchPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    currentResume.matchPercentage >= 80 
                      ? 'bg-green-500' 
                      : currentResume.matchPercentage >= 60 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                  }`} 
                  style={{ width: `${currentResume.matchPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Job Title:</span>
                <p className="text-sm text-gray-900">{currentResume.jobTitle}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <p className="text-sm text-gray-900">{currentResume.jobCategory}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Submitted:</span>
                <p className="text-sm text-gray-900">{currentResume.submittedDate}</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Skills Matched:</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'JavaScript', 'UI/UX', 'Responsive Design'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Missing Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {['GraphQL', 'Next.js'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-4 flex justify-end space-x-3">
              <button
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Download Resume
              </button>
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Contact Candidate
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResumeMatching;