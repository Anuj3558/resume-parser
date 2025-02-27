import React, { useState } from 'react';
import { Plus, FileText, Download, Trash2 } from 'lucide-react';

const JobDescriptions = () => {
  // Mock data
  const [categories] = useState([
    { id: '1', name: 'Software Engineering', createdAt: '2023-05-15T10:30:00Z' },
    { id: '2', name: 'Product Management', createdAt: '2023-06-20T14:45:00Z' },
    { id: '3', name: 'Data Science', createdAt: '2023-07-10T09:15:00Z' },
    { id: '4', name: 'UX Design', createdAt: '2023-08-05T11:20:00Z' },
  ]);

  const [jobDescriptions, setJobDescriptions] = useState([
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
    { 
      id: '4', 
      categoryId: '3', 
      title: 'Data Scientist', 
      description: 'Data Scientist with expertise in machine learning, statistical analysis, and Python...',
      uploadedAt: '2023-09-25T09:15:00Z',
      fileName: 'data_scientist_jd.pdf'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobFile, setJobFile] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleAddJobDescription = () => {
    if (!selectedCategory || !jobTitle || !jobFile) return;

    const newJobDescription = {
      id: Date.now().toString(),
      categoryId: selectedCategory,
      title: jobTitle,
      description: 'Job description content would be extracted from the file...',
      uploadedAt: new Date().toISOString(),
      fileName: jobFile.name
    };

    setJobDescriptions([...jobDescriptions, newJobDescription]);
    setShowModal(false);
    setSelectedCategory('');
    setJobTitle('');
    setJobFile(null);
  };

  const handleDeleteJobDescription = (id) => {
    setJobDescriptions(jobDescriptions.filter(jd => jd.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const filteredJobDescriptions = selectedFilter === 'all' 
    ? jobDescriptions 
    : jobDescriptions.filter(jd => jd.categoryId === selectedFilter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Descriptions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Upload Job Description
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Category
        </label>
        <select
          id="categoryFilter"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Descriptions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobDescriptions.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <FileText size={24} className="text-indigo-600 mr-3" />
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                </div>
                <button
                  onClick={() => handleDeleteJobDescription(job.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {getCategoryName(job.categoryId)}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                {job.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Uploaded: {formatDate(job.uploadedAt)}
                </span>
                <button className="flex items-center text-indigo-600 hover:text-indigo-900 text-sm">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t">
              <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Upload Resumes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Job Description Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload Job Description</h2>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Job Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter job title"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FileText size={24} className="mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setJobFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                  {jobFile && (
                    <p className="text-sm text-indigo-600">{jobFile.name}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddJobDescription}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                disabled={!selectedCategory || !jobTitle || !jobFile}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescriptions;