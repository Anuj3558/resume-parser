import React, { useState, useEffect, useMemo } from "react";
import JobTable from "../components/JobTable";
import JobForm from "../components/JobForm";
// import JobPanel from "./JobPanel";
import Modal from "../components/Modal";
import { Plus, Search, Filter } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { BASE_URL } from "../../constants";
import useNotification from "../../../components/Notification";

const API_URL = `${BASE_URL}/job/jobs`;

export const JobDescriptions = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null); // State for side panel
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedJobForAssign, setSelectedJobForAssign] = useState(null);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState({
    name: "",
    id: "",
  });
  const { contextHolder, openNotification } = useNotification();

  // 🔹 Fetch Jobs from Backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Add or Update Job
  const handleSubmitJob = async (jobData) => {
    try {
      if (currentJob) {
        // Update existing job
        const response = await axios.put(
          `${API_URL}/${currentJob._id}`,
          jobData
        );
        setJobs(
          jobs.map((job) => (job._id === currentJob._id ? response.data : job))
        );
      } else {
        // Add new job
        const u = JSON.parse(localStorage.getItem("user"));
        console.log(u.userId);
        jobData.userId = u.userId;
        jobData.initiator = u.userId;
        console.log(jobData);
        const response = await axios.post(API_URL, jobData);
        setJobs([...jobs, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // 🔹 Delete Job
  const handleDeleteJob = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this job description?")
    ) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.error("Error deleting job:", error);
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
    fetchRecruiters();
  };

  const handleAssignRecruiter = (job) => {
    if (!job) return; // Ensure job exists
    fetchRecruiters();
    setSelectedJobForAssign(job);
    setIsAssignModalOpen(true);
    // setSelectedJobForAssign(job);
    // setIsAssignModalOpen(true);
  };
  const handleDisassignRecruiter = async (job, recruiter) => {
    try {
      console.log(job, recruiter);
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL +
          `/job/jobs/unassign/${job._id}/${recruiter.id}`
      );
    } catch (error) {
      openNotification("error", "Error", `Could not unassign user, ${error}`);
    }
    // setSelectedJobForAssign(job);
    fetchRecruiters();
    // setIsAssignModalOpen(true);
  };
  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUsers`);
      setRecruiters(response.data);
    } catch (error) {
      console.error("Error fetching recruiters:", error);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!selectedRecruiter.name) return alert("Select a recruiter!");
    try {
      await axios.put(`${BASE_URL}/job/assign/${selectedJobForAssign._id}`, {
        userId: selectedRecruiter.id,
      });

      setJobs((prevJobs) => {
        const updatedJobs = prevJobs.map((job) =>
          job._id === selectedJobForAssign._id
            ? {
                ...job,
                assigned: job.assigned
                  ? [...job.assigned, selectedRecruiter]
                  : [selectedRecruiter],
              }
            : job
        );

        // Update selectedJob if it's the one being modified
        if (selectedJob?._id === selectedJobForAssign._id) {
          setSelectedJob((prev) => ({
            ...prev,
            assigned: prev.assigned
              ? [...prev.assigned, selectedRecruiter]
              : [selectedRecruiter],
          }));
        }

        return updatedJobs;
      });

      setIsAssignModalOpen(false);
      setSelectedRecruiter({ name: "", id: "" });
    } catch (error) {
      console.error("Error assigning recruiter:", error);
    }
  };

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          (categoryFilter === "All" || job.category === categoryFilter) &&
          (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [jobs, categoryFilter, searchTerm]
  );

  const categories = [
    "All",
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "DevOps Engineer",
  ];

  return (
    <div className="space-y-6">
      {contextHolder}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Job Descriptions</h1>
        <button
          onClick={() => {
            setCurrentJob(undefined);
            setIsModalOpen(true);
          }}
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
          <h2 className="text-lg font-medium text-gray-900">
            Job Descriptions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage job descriptions and track resume matches
          </p>
        </div>
        <JobTable
          jobs={filteredJobs}
          onView={handleViewJob}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
          onAssign={(job) => handleAssignRecruiter(job)} // Add this
          // onDisassign={(job) => handleDisassignRecruiter(job)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentJob ? "Edit Job Description" : "Add New Job Description"}
      >
        <JobForm
          job={currentJob}
          onSubmit={handleSubmitJob}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={selectedJob && selectedJob}
        onClose={() => setSelectedJob(null)}
        title={`View Job`}
        className={`w-full`}
      >
        <p className="mt-4 text-sm text-gray-900">
          <strong>Category:</strong>{" "}
          <ReactMarkdown>{selectedJob?.category}</ReactMarkdown>
        </p>
        <p className="mt-2 text-sm text-gray-900">
          <strong>Location:</strong>{" "}
          <ReactMarkdown>{selectedJob?.location}</ReactMarkdown>
        </p>
        <p className="mt-2 text-sm text-gray-900">
          <strong>Description:</strong>{" "}
          <ReactMarkdown>{selectedJob?.description}</ReactMarkdown>
        </p>
        <p className="mt-2 text-sm text-gray-900">
          <strong>Requirements:</strong>{" "}
          <ReactMarkdown>{selectedJob?.requirements}</ReactMarkdown>
        </p>
        <p className="mt-2 text-sm text-gray-900">
          <strong>Resume Matches:</strong>{" "}
          <ReactMarkdown>{selectedJob?.resumeMatches.toString()}</ReactMarkdown>
        </p>
        <p className="mt-2 text-sm text-gray-900 ">
          Created on: {new Date(selectedJob?.createdAt).toLocaleDateString()}
        </p>
      </Modal>
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign Recruiters"
      >
        {/* Table for Assigned Recruiters */}
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedJobForAssign?.assigned?.length > 0 ? (
              selectedJobForAssign.assigned.map((recruiter) => (
                <tr key={recruiter.id} className="text-center">
                  <td className="border p-2">{recruiter.name}</td>
                  <td className="border p-2">{recruiter.email}</td>
                  <td className="border p-2">
                    <button
                      className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                      onClick={() =>
                        handleDisassignRecruiter(
                          selectedJobForAssign,
                          recruiter
                        )
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-gray-500">
                  No recruiters assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <select
          value={selectedRecruiter.name}
          onChange={(e) =>
            setSelectedRecruiter({
              name: e.target.options[e.target.selectedIndex].dataset.name,
              id: e.target.value,
            })
          }
          className="border p-2 w-full"
        >
          <option value="">Assign a new recruiter</option>
          {recruiters.map((recruiter) => (
            <option
              key={recruiter._id}
              value={recruiter._id}
              data-name={recruiter.name}
            >
              {recruiter.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
          onClick={handleSubmitAssignment}
        >
          Assign
        </button>
      </Modal>
      {/* 🔹 Job Details Panel */}
      {/* {selectedJob && (
        <JobPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
      )} */}
    </div>
  );
};
