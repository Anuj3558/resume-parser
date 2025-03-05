import React, { useState, useEffect } from 'react';
import JobTable from '../components/JobTable';
import JobForm from '../components/JobForm';
import JobPanel from './JobPanel';
import Modal from '../components/Modal';
import { Plus, Search, Filter } from 'lucide-react';
import axios from 'axios';

import { BASE_URL } from '../../constants';

const API_URL = `${BASE_URL}/job/jobs`;

export const JobDescriptions = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null); // State for side panel

  // 🔹 Fetch Jobs from Backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Add or Update Job
  const handleSubmitJob = async (jobData) => {
    try {
      if (currentJob) {
        // Update existing job
        const response = await axios.put(`${API_URL}/${currentJob._id}`, jobData);
        setJobs(jobs.map((job) => (job._id === currentJob._id ? response.data : job)));
      } else {
        // Add new job
        const response = await axios.post(API_URL, jobData);
        setJobs([...jobs, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  // 🔹 Delete Job
  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job description?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  // 🔹 Open Modal for Editing
  const handleEditJob = (job) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  // 🔹 Open Side Panel for Viewing Job
  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (categoryFilter === 'All' || job.category === categoryFilter) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ['All', 'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Job Descriptions ssdfsdf</h1>
        <button
          onClick={() => { setCurrentJob(undefined); setIsModalOpen(true); }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Job Description
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center rounded-md bg-white px-4 py-2 shadow-sm w-full md:w-96">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search job descriptions..."
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
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Job Descriptions</h2>
          <p className="mt-1 text-sm text-gray-500">Manage job descriptions and track resume matches</p>
        </div>
        <JobTable
          jobs={filteredJobs}
          onView={handleViewJob}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentJob ? 'Edit Job Description' : 'Add New Job Description'}
      >
        <JobForm
          job={currentJob}
          onSubmit={handleSubmitJob}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* 🔹 Job Details Panel */}
      {selectedJob && (
        <JobPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};
