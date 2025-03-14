import React, { useState, useEffect } from "react";
import { Search, ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ResumeEvaluation = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [jobId, setJobId] = useState("");
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const data = [
    {
      name: "College Reputation",
      value: selectedResume?.points?.collegeReputation,
    },
    { name: "Degree", value: selectedResume?.points?.degree },
    { name: "GPA", value: selectedResume?.points?.gpa },
    { name: "Projects", value: selectedResume?.points?.projects },
    { name: "Bonus", value: selectedResume?.points?.bonus },
  ];
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + `/job/jobs`)
      .then((res) => res.json())
      .then((data) => setJobDescriptions(data));
  }, []);

  useEffect(() => {
    if (!jobId) return;
    fetch(process.env.REACT_APP_BACKEND_URL + `/job/resumeEvals/${jobId}`)
      .then((res) => res.json())
      .then((data) => setResumes(data[0]?.resumes || []))
      .catch((err) => console.error("Error fetching resumes:", err));
  }, [jobId]);

  const filteredResumes = resumes.filter((resume) =>
    resume?.evaluation?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Resume Evaluations</h1>
        <select
          onChange={(e) => setJobId(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a Job</option>
          {jobDescriptions.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative">
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
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <button className="flex items-center">
                    Candidate Name <ArrowUpDown size={14} className="ml-1" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Result
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  College
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  City
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResumes.map((resume, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedResume(resume.evaluation)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {resume?.evaluation?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        resume?.evaluation?.result === "Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {resume?.evaluation?.result === "Success" ? (
                        <CheckCircle size={14} className="mr-1" />
                      ) : (
                        <XCircle size={14} className="mr-1" />
                      )}
                      {resume?.evaluation?.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {resume?.evaluation?.college}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {resume?.evaluation?.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {resume?.evaluation?.matching?.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
              onClick={() => setSelectedResume(null)}
            >
              ✖
            </button>

            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold mb-4">{selectedResume.name}</h3>
              <span
                className={`mr-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedResume?.result === "Success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {selectedResume?.result === "Success" ? (
                  <CheckCircle size={14} className="mr-1" />
                ) : (
                  <XCircle size={14} className="mr-1" />
                )}
                {selectedResume?.result}
              </span>
            </div>
            <div className="">
              <p>
                <strong>College:</strong> {selectedResume.college}
              </p>
              <p>
                <strong>City:</strong> {selectedResume.city}
              </p>
              <p>
                <strong>Phone:</strong> {selectedResume.phone}
              </p>

              <p>
                <strong>Gender:</strong> {selectedResume.gender}
              </p>
              <p>
                <strong>Degree:</strong> {selectedResume.degree}
              </p>
              <p>
                <strong>GPA:</strong> {selectedResume.gpa}
              </p>
              <p>
                <strong>Year:</strong> {selectedResume.year}
              </p>
            </div>

            {/* Spacer */}
            <div className="my-4"></div>
            <p>
              <strong>Interests</strong>
            </p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-white border-2 border-white font-medium bg-blue-800`}
            >
              {selectedResume.interest1}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-white border-2 border-white font-medium bg-blue-800`}
            >
              {selectedResume.interest2}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-white border-2 border-white font-medium bg-blue-800`}
            >
              {selectedResume.interest3}
            </span>
            {/* Spacer */}
            <div className="my-4"></div>
            <p className="mt-2">
              <strong>Reason:</strong> {selectedResume.summary}
            </p>

            <h4 className="mt-4 font-semibold">Evaluation Points:</h4>
        

            <button
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setSelectedResume(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeEvaluation;
