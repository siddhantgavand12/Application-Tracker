import React from "react";
import { useAuth } from "../context/AuthContext";
const ApplicationForm = ({
  darkMode,
  formData,
  handleChange,
  handleSubmit,
  editing,
}) => {
  const {isAdmin} = useAuth();
  return (
    <div
      className={`mb-6 p-4 rounded-lg shadow-md ${
        darkMode ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center justify-self-auto space-x-4">
        <input
          type="text"
          placeholder="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={`p-2 border w-full md:w-1/3 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        />
        <input
          type="text"
          placeholder="Candidate Name"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          className={`p-2 border w-full md:w-1/3 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        />
         <select
          name="status"
          className={`p-2 border w-full md:w-1/3 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
       
      </div>
      <div className="flex items-end justify-end space-x-4 mt-4 p-2 w-full md:w-1/3">
        {isAdmin && (
          <button
            className={`p-2 w-full ${
              darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
            }`}
            onClick={handleSubmit}
          >
            {editing ? "Update" : "Create"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
