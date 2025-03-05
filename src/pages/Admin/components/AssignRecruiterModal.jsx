import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import Modal from "./Modal";

export const AssignedRecruitersModal = ({ isOpen, onClose, job, setJob, handleAssign, recruiters }) => {
  const [loading, setLoading] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState("");

  if (!job || !job.assigned) {
    return null;
  }

  // Assign a recruiter
  const handleAssignRecruiter = async () => {
    if (!selectedRecruiter) return;

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/job/jobs/assign/${job._id}`, {
        recruiterId: selectedRecruiter,
      });

      if (response.status === 200) {
        const assignedRecruiter = recruiters.find((r) => r._id === selectedRecruiter);

        // Update state to reflect the new assignment
        setJob((prevJobs) =>
          prevJobs.map((j) =>
            j._id === job._id ? { ...j, assigned: [...j.assigned, assignedRecruiter] } : j
          )
        );
      }
    } catch (error) {
      console.error("Error assigning recruiter:", error);
    } finally {
      setLoading(false);
      setSelectedRecruiter(""); // Reset dropdown after assigning
    }
  };

  // Remove a recruiter
  const handleRemoveRecruiter = async (recruiterId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${BASE_URL}/job/jobs/unassign/${job._id}/${recruiterId}`);

      if (response.status === 200) {
        setJob((prevJobs) =>
          prevJobs.map((j) =>
            j._id === job._id ? { ...j, assigned: j.assigned.filter((r) => r._id !== recruiterId) } : j
          )
        );
      }
    } catch (error) {
      console.error("Error removing recruiter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Recruiters">
      <div>
        {/* Assigned Recruiters List */}
        <h3 className="font-semibold mb-2">Assigned Recruiters:</h3>
        {job.assigned.length > 0 ? (
          <ul className="space-y-2">
            {job.assigned.map((recruiter) => (
              <li key={recruiter._id} className="flex justify-between items-center p-2 border-b">
                <span>{recruiter.name}</span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleRemoveRecruiter(recruiter._id)}
                  disabled={loading}
                >
                  {loading ? "Removing..." : "Remove"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recruiters assigned.</p>
        )}

        {/* Dropdown to Assign New Recruiters */}
        <h3 className="font-semibold mt-4">Assign New Recruiter:</h3>
        <div className="flex gap-2">
          <select
            value={selectedRecruiter}
            onChange={(e) => setSelectedRecruiter(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select a recruiter</option>
            {recruiters
              .filter((r) => !job.assigned.some((assigned) => assigned._id === r._id)) // Exclude already assigned recruiters
              .map((recruiter) => (
                <option key={recruiter._id} value={recruiter._id}>
                  {recruiter.name}
                </option>
              ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAssignRecruiter}
            disabled={loading || !selectedRecruiter}
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
