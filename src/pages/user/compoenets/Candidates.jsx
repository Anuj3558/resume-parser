import React, { useState } from 'react';
import { Upload, Search, Filter, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';

const Candidates = () => {
  // Mock data
  const [jobDescriptions] = useState([
    { 
      id: '1', 
      categoryId: '1', 
      title: 'Senior Frontend Developer', 
      description: 'We are looking for a Senior Frontend Developer with 5+ years of experience in React...',
      uploadedAt: '2023-09-10T08:30:00Z',
      fileName: 'senior_frontend_dev_jd.pdf'
    },
    { 
      id: '2', 
      categoryId: '1', 
      title: 'Backend Engineer', 
      description: 'Backend Engineer with strong knowledge of Node.js, Express, and MongoDB...',
      uploadedAt: '2023-09-15T14:20:00Z',
      fileName: 'backend_engineer_jd.pdf'
    },
    { 
      id: '3', 
      categoryId: '2', 
      title: 'Product Manager - Mobile Apps', 
      description: 'Product Manager with experience in mobile app development and user research...',
      uploadedAt: '2023-09-20T11:45:00Z',
      fileName: 'product_manager_mobile_jd.pdf'
    },
  ]);

  const [candidates, setCandidates] = useState([
    {
      id: '1',
      resumeId: 'r1',
      candidateName: 'John Smith',
      shortlisted: true,
      matchingScore: 85,
      reason: 'Strong experience in React, Redux, and TypeScript. 6 years of frontend development experience.'
    },
    {
      id: '2',
      resumeId: 'r2',
      candidateName: 'Emily Johnson',
      shortlisted: true,
      matchingScore: 92,
      reason: 'Perfect match for required skills. 8 years of experience with modern frontend frameworks.'
    },
    {
      id: '3',
      resumeId: 'r3',
      candidateName: 'Michael Brown',
      shortlisted: false,
      matchingScore: 65,
      reason: 'Missing key experience with TypeScript and state management libraries.'
    },
    {
      id: '4',
      resumeId: 'r4',
      candidateName: 'Sarah Wilson',
      shortlisted: true,
      matchingScore: 78,
      reason: 'Good match for core skills, but limited experience with required testing frameworks.'
    },
    {
      id: '5',
      resumeId: 'r5',
      candidateName: 'David Lee',
      shortlisted: false,
      matchingScore: 45,
      reason: 'Insufficient experience and missing several key required skills.'
    },
  ]);

  const [selectedJob, setSelectedJob] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'matchingScore',
    direction: 'descending'
  });
  const [filterShortlisted, setFilterShortlisted] = useState('all');
  const [resumeFiles, setResumeFiles] = useState([]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleUploadResumes = () => {
    // In a real application, this would upload the files to a server
    // and process them against the selected job description
    
    // Mock implementation: add random candidates
    if (resumeFiles.length > 0) {
      const newCandidates = resumeFiles.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        resumeId: `r-new-${Date.now()}-${index}`,
        candidateName: file.name.split('.')[0].replace(/_/g, ' '),
        shortlisted: Math.random() > 0.5,
        matchingScore: Math.floor(Math.random() * 60) + 40,
        reason: Math.random() > 0.5 
          ? 'Good match for required skills, but limited experience.' 
          : 'Missing some key required skills and experience.'
      }));
      
      setCandidates([...candidates, ...newCandidates]);
      setShowUploadModal(false);
      setResumeFiles([]);
    }
  };

  // Apply sorting
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (a[sortConfig.key]  < b[sortConfig.key ]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key ] > b[sortConfig.key ]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Apply filtering
  const filteredCandidates = sortedCandidates.filter(candidate => {
    const matchesSearch = candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShortlisted = 
      filterShortlisted === 'all' ? true : 
      filterShortlisted === 'shortlisted' ? candidate.shortlisted : 
      !candidate.shortlisted;
    
    return matchesSearch && matchesShortlisted;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Candidates</h1>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {jobDescriptions.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Upload size={20} className="mr-2" />
            Upload Resumes
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <select
              value={filterShortlisted}
              onChange={(e) => setFilterShortlisted(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Candidates</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => handleSort('candidateName')}
                  >
                    Candidate Name
                    <ArrowUpDown size={14} className="ml-1" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => handleSort('shortlisted')}
                  >
                    Status
                    <ArrowUpDown size={14} className="ml-1" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => handleSort('matchingScore')}
                  >
                    Matching Score
                    <ArrowUpDown size={14} className="ml-1" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{candidate.candidateName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      candidate.shortlisted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {candidate.shortlisted 
                        ? <CheckCircle size={14} className="mr-1" /> 
                        : <XCircle size={14} className="mr-1" />
                      }
                      {candidate.shortlisted ? 'Shortlisted' : 'Rejected'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            candidate.matchingScore >= 80 ? 'bg-green-500' :
                            candidate.matchingScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${candidate.matchingScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700">{candidate.matchingScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-md">{candidate.reason}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Resumes Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected Job: <span className="font-medium">{jobDescriptions.find(job => job.id === selectedJob)?.title}</span>
              </p>
              
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload size={24} className="mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="resume-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        id="resume-upload"
                        name="resume-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files) {
                            setResumeFiles(Array.from(e.target.files));
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 10MB each
                  </p>
                  {resumeFiles.length > 0 && (
                    <div className="mt-2 text-sm text-indigo-600">
                      <p>{resumeFiles.length} file(s) selected</p>
                      <ul className="text-left mt-1 ml-4 list-disc">
                        {resumeFiles.slice(0, 3).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                        {resumeFiles.length > 3 && <li>...and {resumeFiles.length - 3} more</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setResumeFiles([]);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadResumes}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                disabled={resumeFiles.length === 0}
              >
                Process Resumes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;