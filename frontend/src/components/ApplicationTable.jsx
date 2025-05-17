import React from "react";

const ApplicationTable = ({
  darkMode,
  applications,
  isAdmin,
  startEditing,
  handleDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border mt-6 overflow-x-auto">
        <thead
          className={`${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}
        >
          <tr>
            <th className="px-6 py-3 border text-center text-sm sm:text-base">Job Title</th>
            <th className="px-6 py-3 border text-center text-sm sm:text-base">Candidate Name</th>
            <th className="px-6 py-3 border text-center text-sm sm:text-base">Status</th>
            <th className="px-6 py-3 border text-center text-sm sm:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">No applications found.</td>
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
                <td className="px-6 py-4 text-center">
                  {isAdmin ? (
                    <>
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
                    </>
                  ) : (
                    <span className="text-sm text-gray-500 italic">
                      Login to manage
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
