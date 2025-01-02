import React, { useState, useEffect } from "react";
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/api";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    jobTitle: "",
    candidateName: "",
    status: "Applied",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const handleCreate = async () => {
    try {
      const newApplication = await createApplication(formData);
      setApplications([...applications, newApplication]);
      setFormData({ jobTitle: "", candidateName: "", status: "Applied" });
    } catch (error) {
      console.error("Failed to create application", error);
    }
  };

  const handleUpdate = async () => {
    const updatedData = { ...formData };
    try {
      const updatedApplication = await updateApplication(editId, updatedData);
      setApplications(
        applications.map((app) =>
          app._id === editId ? updatedApplication : app
        )
      );
      setEditing(false);
      setEditId(null);
      setFormData({ jobTitle: "", candidateName: "", status: "Applied" });
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startEditing = (application) => {
    setFormData({
      jobTitle: application.jobTitle,
      candidateName: application.candidateName,
      status: application.status,
    });
    setEditing(true);
    setEditId(application._id);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md flex items-center justify-between">
  <div className="flex items-center space-x-4">
    <img src="/tm_logo.png" alt="Logo" className="h-10 rounded-md" />
    <h1 className="text-1xl sm:text-1xl md:text-2xl lg:text-3xl font-bold">
      Application Tracker for Tapasvi Mhatre
    </h1>
  </div>

  <div className="flex items-center space-x-4">
    <button
      onClick={toggleDarkMode}
      className={`font-bold flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
        darkMode ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-white"
      }`}
    >
      {darkMode ? (
        <>
          {/* Sun Icon for Light Mode */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2m0 14v2m9-9h-2m-14 0H3m16.364-7.364l-1.414 1.414M5.05 5.05l1.414 1.414M18.364 18.364l-1.414-1.414M5.05 18.364l1.414-1.414M12 8a4 4 0 110 8 4 4 0 010-8z"
            />
          </svg>
          Light Mode
        </>
      ) : (
        <>
          {/* Moon Icon for Dark Mode */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
            />
          </svg>
          Dark Mode
        </>
      )}
    </button>

    <div className="relative">
      <button className="text-white">
        <i className="fa fa-bell"></i>
      </button>
      {/* <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">
        5
      </span> */}
    </div>

    {/* <!-- User photo and name hidden on small screens --> */}
    <div className="hidden md:flex items-center space-x-3">
      <img src="/user.png" alt="Logo" className="h-10 rounded-md" />
      <span className="text-lg">Tapasvi</span>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="flex-1 p-6 w-full">
        <div
          className={`mb-6 p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between space-x-4">
            <input
              type="text"
              placeholder="Job Title"
              className={`p-2 border w-full md:w-1/3 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Candidate Name"
              className={`p-2 border w-full md:w-1/3 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
            />
            <button
              className={`p-2 w-1/4 ${
                darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={editing ? handleUpdate : handleCreate}
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>

          <select
            name="status"
            className={`p-2 border mt-4 w-full md:w-1/3 ${
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

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border mt-6 overflow-x-auto">
            <thead
              className={`${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
              }`}
            >
              <tr>
                <th className="px-6 py-3 border text-center text-sm sm:text-base">
                  Job Title
                </th>
                <th className="px-6 py-3 border text-center text-sm sm:text-base">
                  Candidate Name
                </th>
                <th className="px-6 py-3 border text-center text-sm sm:text-base">
                  Status
                </th>
                <th className="px-6 py-3 border text-center text-sm sm:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr
                    key={application._id}
                    className={`border-b hover:${
                      darkMode ? "bg-gray-600" : "bg-gray-100"
                    } transition-all duration-200 ease-in-out`}
                  >
                    <td className="px-6 py-4 text-center text-sm sm:text-base">
                      {application.jobTitle}
                    </td>
                    <td className="px-6 py-4 text-center text-sm sm:text-base">
                      {application.candidateName}
                    </td>
                    <td className="px-6 py-4 text-center text-sm sm:text-base">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          application.status === "Hired"
                            ? "bg-green-500 text-white"
                            : application.status === "Rejected"
                            ? "bg-red-500 text-white"
                            : application.status === "Shortlisted"
                            ? "bg-yellow-500 text-white"
                            : application.status === "Interviewed"
                            ? "bg-orange-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm sm:text-base">
                      <button
                        className={`text-sm ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        } hover:underline p-2 rounded-lg ${
                          darkMode
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-blue-100 hover:bg-blue-200"
                        }`}
                        onClick={() => startEditing(application)}
                      >
                        Edit
                      </button>
                      <button
                        className={`text-sm ${
                          darkMode ? "text-red-400" : "text-red-600"
                        } hover:underline p-2 rounded-lg ${
                          darkMode
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-red-100 hover:bg-red-200"
                        } ml-2`}
                        onClick={() => handleDelete(application._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white p-4 shadow-md w-full mt-auto">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} MMC PTV Ltd. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
