import React, { useState, useEffect } from 'react';
import { Upload, Search, Filter, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';

const Candidates = () => {
  // State management
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'matchingScore',
    direction: 'descending'
  });
  const [filterShortlisted, setFilterShortlisted] = useState('all');
  const [resumeFiles, setResumeFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch job descriptions when component mounts
  useEffect(() => {
    fetchJobDescriptions();
  }, []);

  // Fetch candidates when selected job changes
  useEffect(() => {
    if (selectedJob) {
      fetchCandidates(selectedJob);
    }
  }, [selectedJob]);

  // Fetch job descriptions from backend
  const fetchJobDescriptions = async () => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      
      if (!u || !u.userId) {
        setError("User information not found");
        return;
      }
      
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/recruiter/getAllJobs/${u.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const data = await response.json();
      
      let tempResumeFiles = [];
      
      data.forEach((job) => {
        setCategories((prev) => {
          if (!prev.find((cat) => cat.id === job.categoryId)) {
            return [...prev, {id: job.categoryId, name: job.category}];
          }
          return prev;
        });
        
        setJobDescriptions((prev) => {
          if (prev.some((existingJob) => existingJob.id === job._id)) {
            return prev;
          }
          return [
            ...prev,
            {
              id: job._id,
              category: job.category,
              title: job.title,
              description: job.description,
              uploadedAt: job.createdAt,
              initiator: job.initiator,
            },
          ];
        });
        
        // Set the resumes for each job
        const res = job?.resumes || [];
        
        if (res && res.length > 0) {
          tempResumeFiles = [...tempResumeFiles, ...res.map((resume) => resume?.name)];
        }
      });
      
      setResumeFiles(tempResumeFiles);
    } catch (error) {
      setError("Error fetching jobs");
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch candidates for selected job
  const fetchCandidates = async (jobId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/process-resumes/job/${jobId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      const data = await response.json();
      console.log(data)
      setCandidates(data?.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching candidates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle job selection change
  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  // Handle file upload
  const handleUploadResumes = async () => {
    if (resumeFiles.length === 0 || !selectedJob) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob);
      
      resumeFiles.forEach(file => {
        formData.append('resumes', file);
      });
      
      const response = await fetch('/api/upload-resumes', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload resumes');
      }
      
      // Refresh candidates list after successful upload
      await fetchCandidates(selectedJob);
      setShowUploadModal(false);
      setResumeFiles([]);
    } catch (err) {
      setError(err.message);
      console.error('Error uploading resumes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
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
          {isLoading && jobDescriptions.length === 0 ? (
            <div className="text-gray-500">Loading job descriptions...</div>
          ) : error && jobDescriptions.length === 0 ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <>
              <select
                value={selectedJob}
                onChange={handleJobChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a job</option>
                {jobDescriptions.length === 0 ? (
                  <option value="" disabled>No jobs available</option>
                ) : (
                  jobDescriptions.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))
                )}
              </select>
              
                
            </>
          )}
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
        {isLoading && candidates.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Loading candidates...</div>
        ) : error && candidates.length === 0 ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchTerm ? "No candidates match your search criteria" : 
             selectedJob ? "No candidates available for this job" : "Select a job to view candidates"}
          </div>
        ) : (
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
                        candidate.result  === 'success'
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {candidate.result === 'success' 
                          ? <CheckCircle size={14} className="mr-1" /> 
                          : <XCircle size={14} className="mr-1" />
                        }
                        {candidate.result }
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
        )}
      </div>

      {/* Upload Resumes Modal */}
      
    </div>
  );
};

export default Candidates;