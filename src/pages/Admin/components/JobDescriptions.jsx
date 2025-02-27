import React, { useState } from 'react';
import  JobTable  from '../components/JobTable';
import  JobForm  from '../components/JobForm';
import  Modal  from '../components/Modal';
import { Plus, Search, Filter } from 'lucide-react';

export const JobDescriptions = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      category: 'Software Engineer',
      description: 'We are looking for a Senior Frontend Developer with expertise in React and TypeScript.',
      requirements: 'Minimum 5 years of experience with modern JavaScript frameworks, strong TypeScript skills.',
      location: 'San Francisco, CA',
      createdAt: '2023-05-15',
      resumeMatches: 24,
    },
    {
      id: 2,
      title: 'Data Scientist',
      category: 'Data Scientist',
      description: 'Join our data science team to build machine learning models and analyze large datasets.',
      requirements: 'Experience with Python, TensorFlow, and data visualization tools.',
      location: 'New York, NY',
      createdAt: '2023-06-02',
      resumeMatches: 18,
    },
    {
      id: 3,
      title: 'Product Manager',
      category: 'Product Manager',
      description: 'Lead product development and work with cross-functional teams to deliver great user experiences.',
      requirements: 'Experience in product management, strong communication skills, and technical background.',
      location: 'Austin, TX',
      createdAt: '2023-06-10',
      resumeMatches: 12,
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      category: 'UX Designer',
      description: 'Design intuitive and beautiful user interfaces for our web and mobile applications.',
      requirements: 'Portfolio showcasing UX/UI design work, proficiency in Figma and Adobe Creative Suite.',
      location: 'Seattle, WA',
      createdAt: '2023-06-15',
      resumeMatches: 9,
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      category: 'DevOps Engineer',
      description: 'Manage our cloud infrastructure and implement CI/CD pipelines.',
      requirements: 'Experience with AWS, Docker, Kubernetes, and infrastructure as code.',
      location: 'Chicago, IL',
      createdAt: '2023-06-20',
      resumeMatches: 15,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleAddJob = () => {
    setCurrentJob(undefined);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  const handleViewJob = (job) => {
    // In a real application, this would show a detailed view
    alert(`Viewing job: ${job.title}`);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job description?')) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  const handleSubmitJob = (jobData) => {
    if (currentJob) {
      // Update existing job
      setJobs(
        jobs.map((job) =>
          job.id === currentJob.id ? { ...job, ...jobData } : job
        )
      );
    } else {
      // Add new job
      const newJob = {
        id: Math.max(0, ...jobs.map((j) => j.id)) + 1,
        ...jobData,
        createdAt: new Date().toISOString().split('T')[0],
        resumeMatches: 0,
      };
      setJobs([...jobs, newJob]);
    }
    setIsModalOpen(false);
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
        <h1 className="text-2xl font-bold text-gray-900">Job Descriptions</h1>
        <button
          onClick={handleAddJob}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          <p className="mt-1 text-sm text-gray-500">
            Manage job descriptions and track resume matches
          </p>
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
    </div>
  );
};